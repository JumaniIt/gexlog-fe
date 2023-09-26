import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import { Divider } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, withSession } from "../../app/utils/sessionUtils";
import {
  search as searchClients,
  addConsignee,
  getById as getClientById,
} from "../../app/services/clientService";
import ConsigneeModal from "../ConsigneeModal/consigneeModal";
import { getById as getUserById } from "../../app/services/userService";

const ProfileView = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);
  const [consigneeAction, setConsigneeAction] = useState(false);
  const [consigneeModal, setConsigneeModal] = useState(false);
  const [profile, setProfile] = useState({
    nickname: "",
    email: "",
    client_id: "",
    name: "",
    phone: "",
    cuit: "",
    consignees: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchInitialData = async () => {
      await withSession(
        navigate,
        async () => {
          if (currentUser?.admin && id) {
            const client = await getClientById(id, "true");
            let user;
            if (client?.user_id) {
              user = await getUserById(client.user_id);
            }

            setProfile({
              ...profile,
              client_id: client.id,
              name: client.name,
              phone: client.phone,
              cuit: client.cuit,
              consignees: client.consignees,
              nickname: user?.nickname || "(sin definir)",
              email: user?.email || "(sin definir)",
            });
          } else {
            const result = await searchClients({
              user_id: currentUser.id,
              with_consignees: true,
              page_size: 1,
            });
            if (result?.elements) {
              const client = result.elements[0];
              setProfile({
                ...profile,
                client_id: client.id,
                name: client.name,
                phone: client.phone,
                cuit: client.cuit,
                consignees: client.consignees,
                nickname: currentUser.nickname,
                email: currentUser.email,
              });
            }
          }
        },
        (error) => console.error("Error fetching order:", error)
      );
    };

    fetchInitialData();
  }, []);

  const openConsigneeModal = () => {
    setConsigneeModal(true);
  };

  const saveNewConsignee = async (consignee) => {
    setConsigneeAction(true);
    await withSession(
      navigate,
      async () => {
        const response = await addConsignee(profile.client_id, consignee);
        if (response.message) {
          // Todo error alert
          console.log("error creating consignee", response);
        } else {
          setProfile({
            ...profile,
            consignees: [...profile.consignees, response],
          });
        }
      },
      (error) => console.log(error),
      () => setConsigneeAction(false)
    );
  };

  return (
    <>
      <div className="data">
        <div className="item">
          <Heading as="h6" size="sm">
            Usuario
          </Heading>
          <Text fontSize="sm">{profile.nickname}</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">
            E-mail
          </Heading>
          <Text fontSize="sm">{profile.email}</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">
            Nombre
          </Heading>
          <Text fontSize="sm">{profile.name}</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">
            Teléfono
          </Heading>
          <Text fontSize="sm">{profile.phone}</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">
            CUIT
          </Heading>
          <Text fontSize="sm">{profile.cuit}</Text>
        </div>
      </div>
      <ConsigneeModal
        isOpen={consigneeModal}
        onSave={saveNewConsignee}
        onClose={() => setConsigneeModal(false)}
      />
      <Divider />
      <div className="table-heading">
        <Heading className="second-heading" as="h6" size="sm">
          Consignatarios
        </Heading>
        <Button
          size="sm"
          colorScheme="green"
          onClick={openConsigneeModal}
          isLoading={consigneeAction}
        >
          <MdCreate />
          Crear consignatario
        </Button>
      </div>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>CUIT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {profile.consignees?.map((c) => {
              return (
                <Tr>
                  <Td>{c.name}</Td>
                  <Td>{c.cuit}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileView;
