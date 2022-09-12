import { useState, useEffect, React } from "react";
import Header from '../../components/Header'

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { Label, Form, Table, Button, FormGroup, Col, Input } from "reactstrap";

import updateButton from "../../assets/pencil.png";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import "../../styles/home.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import logoJaDelivery from "../../assets/pngtree-cartoon-delivery-staff_cb.png";
import facebook from "../../assets/facebook(1).png";
import instagram from "../../assets/instagram(1).png";
import twitter from "../../assets/twitter(1).png";

import { db } from "../../firebase";
import Modal from "react-modal";

function ListaUsuarios() {
  //Constantes do update
  const [newNome, setNewNome] = useState("");
  const [newTelefone, setNewTelefone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newDataNascimento, setNewDataNascimento] = useState("");
  const [newTipoUsuario, setNewTipoUsuario] = useState("");
  const [newSenha, setNewSenha] = useState("");
  const [newStatus, setNewStatus] = useState("");

  //Camada de update

  const updateUser = async (
    id,
    nome,
    telefone,
    email,
    data_nascimento,
    tipo_usuario,
    senha,
    status
  ) => {
    const userDoc = doc(db, "users", id);
    const newFields = {
      nome: newNome,
      telefone: newTelefone,
      email: newEmail,
      data_nascimento: newDataNascimento,
      tipo_usuario: newTipoUsuario,
      senha: newSenha,
      status: newStatus
    };
    await updateDoc(userDoc, newFields);
    alert("Usuario alterado com sucesso");
    window.location.reload();
  };

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    alert("Usuário deletado");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      console.log("teste");
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <>
      <Header/>

      <section className="listaUsuariosRegistros">
        <div>
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Data nascimento</th>
                <th>Tipo Usuario</th>
                <th>Senha</th>

                <th>Status</th>

                <th>Ação</th>
              </tr>
            </thead>

            {users.map((user) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.nome}</td>
                    <td>{user.telefone}</td>
                    <td>{user.email}</td>
                    <td>{user.data_nascimento}</td>
                    <td>{user.tipo_usuario}</td>
                    <td>{user.senha}</td>

                    <td>{user.status}</td>

                    <td class="tableUserData">
                      <Button className="buttonUpdateUser" onClick={toggleShow}>
                        <img
                          height="10px"
                          width="10px"
                          src={updateButton}
                        ></img>
                      </Button>
                      <MDBModal
                        show={basicModal}
                        setShow={setBasicModal}
                        tabIndex="-1"
                      >
                        <MDBModalDialog>
                          <MDBModalContent className="modalUserUpdate">
                            <MDBModalHeader>
                              <MDBModalTitle>Modal title</MDBModalTitle>
                              <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                              <Form className="form-update-user">
                                <FormGroup row>
                                  <Label for="nome" sm={2}>
                                    Nome
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="text"
                                      name="nome"
                                      id="nome"
                                      placeholder="Nome"
                                      onChange={(event) => {
                                        setNewNome(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="email" sm={2}>
                                    Email
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="email"
                                      name="email"
                                      id="email"
                                      placeholder="Email"
                                      onChange={(event) => {
                                        setNewEmail(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="data_nascimento" sm={2}>
                                    D.O.B
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="date"
                                      name="data_nascimento"
                                      id="data_nascimento"
                                      placeholder="Data de nascimento"
                                      onChange={(event) => {
                                        setNewDataNascimento(
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="tipo_usuario" sm={2}>
                                    Tipo
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="select"
                                      name="select"
                                      id="exampleSelect"
                                      onChange={(event) => {
                                        setNewTipoUsuario(event.target.value);
                                      }}
                                    >
                                      <option>Administrador</option>
                                      <option>Estoquista</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="telefone" sm={2}>
                                    Telefone
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="tel"
                                      name="telefone"
                                      id="telefone"
                                      placeholder="Telefone"
                                      onChange={(event) => {
                                        setNewTelefone(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="senha" sm={2}>
                                    Senha
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="password"
                                      name="senha"
                                      id="senha"
                                      placeholder="senha"
                                      onChange={(event) => {
                                        setNewSenha(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="status" sm={2}>
                                    status
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="select"
                                      name="status"
                                      id="status"
                                      onChange={(event) => {
                                        setNewStatus(event.target.value);
                                      }}
                                    >
                                      <option>Ativo</option>
                                      <option>Inativo</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                              </Form>
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                className="modalEditCloseBtn"
                                color="secondary"
                                onClick={toggleShow}
                              >
                                Close
                              </MDBBtn>
                              <MDBBtn
                                className="modalEditSaveBtn"
                                onClick={() => {
                                  updateUser(
                                    user.id,
                                    user.nome,
                                    user.telefone,
                                    "",
                                    "",
                                    user.senha
                                  );
                                }}
                              >
                                Save changes
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                      <Button
                        height="10px"
                        width="10px"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        x
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      </section>

      <footer>
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">
              © 2022 Delivery, JáDelivery
            </p>
            <a
              href="/"
              className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <svg className="bi me-2" width={40} height={32}>
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>
            <ul className="nav col-md-4 justify-content-end">
              <li className="nav-item logo-itens">
                <img height="30px" src={facebook}></img>
              </li>
              <li className="nav-item logo-itens">
                <img height="30px" src={instagram}></img>
              </li>
              <li className="nav-item logo-itens">
                <img height="30px" src={twitter}></img>
              </li>
            </ul>
          </footer>
        </div>
      </footer>
    </>
  );
}

export default ListaUsuarios;
