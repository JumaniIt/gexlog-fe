import React, { useState } from "react";
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
import { search as searchUsers } from "../../app/services/userService";
import PaginationFooter from "../Pagination/paginationFooter";

const UserTable = () => {
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  const [paginationResult, setPaginationResult] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [currentSearchFilters, setCurrentSearchFilters] = useState({});

  const handleClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const search = async (f) => {
    try {
      setLoading(true);
      const data = await searchUsers(f);
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

  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <Input
          size="sm"
          placeholder="Email"
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        ></Input>
        <Input
          size="sm"
          placeholder="Nickname"
          onChange={(e) => setFilters({ ...filters, nickname: e.target.value })}
        />
        <Select
          size="sm"
          placeholder="Rol"
          onChange={(e) => setFilters({ ...filters, admin: e.target.value })}
        >
            <option key={true} value={true}>
              ADMIN
            </option>
            <option key={true} value={true}>
              CLIENTE
            </option>

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
                    <Th>Email</Th>
                    <Th>Nickname</Th>
                    <Th>Admin</Th>
                    <Th>Ver</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {searchResults &&
                    searchResults?.map((result) => {
                      return (
                        <Tr className="table-row">
                          <Td>{result.id}</Td>
                          <Td>{result.email}</Td>
                          <Td>{result.nickname}</Td>
                          <Td>
                            {result.admin ? "ADMIN" : "CLIENTE"}
                          </Td>
                          <Td>
                            <Link to={`./user/${result.id}`}>
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

export default UserTable;
