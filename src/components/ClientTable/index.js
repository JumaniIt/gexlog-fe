import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { MdSearch, MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { search as searchClients } from "../../app/services/clientService";
import { search as searchUsers } from "../../app/services/userService";
import PaginationFooter from "../Pagination/paginationFooter";
import { getIdAndName } from "../../app/utils/userUtils";

const ClientTable = () => {
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
    with_consignees: false,
  });
  const [paginationResult, setPaginationResult] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [currentSearchFilters, setCurrentSearchFilters] = useState({});
  const [userOptions, setUserOptions] = useState([]);

  const handleClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const search = async (f) => {
    try {
      setLoading(true);
      const data = await searchClients(f);
      setSearchResults(data?.elements);
      setPaginationResult({
        totalPages: data.total_pages,
        page: data.page,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserOptionsData = async () => {
      try {
        const options = await searchUsers({ page_size: 100, admin: "false" });
        const users = options.elements;
        setUserOptions(users);
      } catch (error) {
        console.error("Error fetching client options:", error);
      }
    };

    fetchUserOptionsData();
  }, []);

  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <Input
          size="sm"
          placeholder="Nombre"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        ></Input>
        <Input
          size="sm"
          placeholder="Telefono"
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
        />
        <Input
          size="sm"
          placeholder="CUIT"
          onChange={(e) => setFilters({ ...filters, cuit: e.target.value })}
        />
        <Select
          size="sm"
          placeholder="Usuario"
          onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
        >
          {userOptions.map((user) => (
            <option key={user.id} value={user.id}>
              {getIdAndName(user)}
            </option>
          ))}
        </Select>
        <Button size="sm" onClick={handleClick}>
          <MdSearch />
          Buscar
        </Button>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
          }}
        >
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </div>
      ) : (
        <div>
          <div className="results-table">
            <TableContainer>
              <Table variant="striped" size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nombre</Th>
                    <Th>Telefono</Th>
                    <Th>Cuit</Th>
                    <Th>Usuario</Th>
                    <Th>Ver</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {searchResults &&
                    searchResults?.map((result) => {
                      return (
                        <Tr className="table-row">
                          <Td>{result.id}</Td>
                          <Td>{result.name}</Td>
                          <Td>{result.phone}</Td>
                          <Td>{result.cuit}</Td>
                          <Td>{result.user_id}</Td>
                          <Td>
                            <Link to={`./cients/${result.id}`}>
                              <MdOutlineOpenInNew />
                            </Link>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          {paginationResult && (
            <PaginationFooter
              currentPage={paginationResult.page}
              totalPages={paginationResult.totalPages}
              onPageChange={(newPage) => {
                const filters = { ...currentSearchFilters, page: newPage };
                search(filters);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ClientTable;
