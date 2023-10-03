import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { MdSearch, MdOutlineOpenInNew, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { search as searchClients } from "../../app/services/clientService";
import { search as searchUsers } from "../../app/services/userService";
import PaginationFooter from "../Pagination/paginationFooter";
import { getIdAndName } from "../../app/utils/userUtils";
import { withSession } from "../../app/utils/sessionUtils";
import { MdMoreVert } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import { ERROR } from "../../app/utils/alertUtils";
import { useClientContext } from "../context/clientContext";
import LabeledItem from "../LabeledItem";

const ClientTable = ({ showAlert, setBlurLoading }) => {
  const { clientSearchContext, setClientSearchContext } = useClientContext();
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
  const navigate = useNavigate();

  const handleClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const search = async (f) => {
    await withSession(
      navigate,
      async () => {
        setLoading(true);
        const data = await searchClients(f);
        if (data._isError) {
          showAlert(ERROR, data.code, data.message);
        } else {
          setSearchResults(data?.elements);
          setPaginationResult({
            totalPages: data.total_pages,
            page: data.page,
          });

          setClientSearchContext({ results: data, filters: filters });
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setBlurLoading(true);

      await withSession(navigate, async () => {
        const options = await searchUsers({ page_size: 100, admin: "false" });
        if (options._isError) {
          showAlert(ERROR, options.code, options.message);
        } else {
          const users = options.elements;
          setUserOptions(users);
        }
      });

      if (clientSearchContext.results) {
        const results = clientSearchContext.results;
        setSearchResults(results.elements);
        setPaginationResult({
          totalPages: results.total_pages,
          page: results.page,
        });

        setFilters(clientSearchContext.filters);
      }

      setBlurLoading(false);
    };

    fetchInitialData();
  }, []);

  return (
    <div className="filter-table-container">
      <div className="clients-filter-bar">
        <LabeledItem
          item={
            <Input
              size="sm"
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              value={filters?.name}
            />
          }
          label="Nombre"
        />
        <LabeledItem
          item={
            <Input
              size="sm"
              onChange={(e) =>
                setFilters({ ...filters, phone: e.target.value })
              }
              value={filters?.phone}
            />
          }
          label="Teléfono"
        />
        <LabeledItem
          item={
            <Input
              size="sm"
              onChange={(e) => setFilters({ ...filters, cuit: e.target.value })}
              value={filters?.cuit}
            />
          }
          label="CUIT"
        />
        <LabeledItem
          item={
            <Select
              size="sm"
              placeholder="-"
              onChange={(e) =>
                setFilters({ ...filters, user_id: e.target.value })
              }
              value={filters?.user_id}
            >
              {userOptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {getIdAndName(user)}
                </option>
              ))}
            </Select>
          }
          label="Usuario"
        />
        <Button className="search-button" size="sm" onClick={handleClick}>
          <MdSearch />
          Buscar
        </Button>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => navigate("./new", { replace: true })}
        >
          <MdCreate />
          Crear
        </Button>
      </div>
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
                </Tr>
              </Thead>
              {!loading && (
                <Tbody>
                  {searchResults &&
                    searchResults?.map((result) => {
                      return (
                        <Tr className="table-row">
                          <Td>{result.id}</Td>
                          <Td>{result.name}</Td>
                          <Td>{result.phone}</Td>
                          <Td>{result.cuit}</Td>
                          <Td>
                            {(result.user_id &&
                              getIdAndName(
                                userOptions.find(
                                  (uo) => uo.id === result.user_id
                                )
                              )) ||
                              "(sin asignar)"}
                          </Td>
                          <Td>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<MdMoreVert className="menu-button" />}
                                variant="outline"
                              />
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    navigate("/clients/" + result.id)
                                  }
                                >
                                  Editar
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    navigate("/profile/" + result.id)
                                  }
                                >
                                  Perfil
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </div>
        {loading && (
          <div className="spinner">
            <Spinner
              className="spinner"
              size="xl"
              color="blue.500"
              thickness="4px"
            />
          </div>
        )}
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
    </div>
  );
};

export default ClientTable;
