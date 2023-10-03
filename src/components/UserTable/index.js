import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { MdSearch, MdOutlineOpenInNew, MdCreate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { search as searchUsers } from "../../app/services/userService";
import PaginationFooter from "../Pagination/paginationFooter";
import { withSession } from "../../app/utils/sessionUtils";
import { useUserContext } from "../context/userContext";
import { ERROR } from "../../app/utils/alertUtils";
import LabeledItem from "../LabeledItem";

const UserTable = ({ showAlert, setBlurLoading }) => {
  const { userSearchContext, setUserSearchContext } = useUserContext();
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  const [paginationResult, setPaginationResult] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [currentSearchFilters, setCurrentSearchFilters] = useState({});
  const navigate = useNavigate();

  const handleClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const search = async (f) => {
    setLoading(true);
    withSession(
      navigate,
      async () => {
        const result = await searchUsers(f);
        if (result._isError) {
          showAlert(ERROR, result.code, result.message);
        } else {
          setSearchResults(result?.elements);
          setPaginationResult({
            totalPages: result.total_pages,
            page: result.page,
          });

          setUserSearchContext({ results: result, filters: filters });
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = () => {
      setBlurLoading(true);

      if (userSearchContext.results) {
        const results = userSearchContext.results;
        setSearchResults(results.elements);
        setPaginationResult({
          totalPages: results.total_pages,
          page: results.page,
        });

        setFilters(userSearchContext.filters);
      }

      setBlurLoading(false);
    };

    fetchInitialData();
  }, []);

  return (
    <div className="filter-table-container">
      <div className="users-filter-bar">
        <LabeledItem
          item={
            <Input
              size="sm"
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
              value={filters?.email}
            />
          }
          label="Email"
        />
        <LabeledItem
          item={
            <Input
              size="sm"
              onChange={(e) =>
                setFilters({ ...filters, nickname: e.target.value })
              }
              value={filters?.nickname}
            />
          }
          label="Nickname"
        />
        <LabeledItem item={
        <Select
          size="sm"
          placeholder="-"
          onChange={(e) => {
            setFilters({ ...filters, admin: e.target.value });
          }}
          value={filters?.admin}
        >
          <option key={true} value={"true"}>
            ADMIN
          </option>
          <option key={true} value={"false"}>
            CLIENTE
          </option>
        </Select> } label="Rol" />
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
                  <Th>Email</Th>
                  <Th>Nickname</Th>
                  <Th>Admin</Th>
                  <Th>Ver</Th>
                </Tr>
              </Thead>
              {!loading && (
                <Tbody>
                  {searchResults &&
                    searchResults?.map((result) => {
                      return (
                        <Tr className="table-row">
                          <Td>{result.id}</Td>
                          <Td>{result.email}</Td>
                          <Td>{result.nickname}</Td>
                          <Td>{result.admin ? "ADMIN" : "CLIENTE"}</Td>
                          <Td>
                            <Link to={`./${result.id}`}>
                              <MdOutlineOpenInNew />
                            </Link>
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

export default UserTable;
