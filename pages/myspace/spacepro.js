import React, { useState, useEffect, Fragment } from "react";

import Link from "next/link";
import axios from "axios";
import { URL } from "../../urlapi";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/fr";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import { useAppContext } from "../../libs/ContextLib";
import { Select, Form, Layout, Col, Row, Input, Divider } from "antd";
import {
  HeartFilled,
  EditFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
const { Content } = Layout;

export default function Spacepro({ user, banniere }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUsername, setPermissions } = useAppContext();
  const { Option } = Select;
  const [form] = Form.useForm();

  const [demandes, setDemandes] = useState(null);
  const [loadingBan, setLoadingBan] = useState(false);
  const [bannieres, setBannieres] = useState(null);
  useEffect(() => {
    setLoading(true);
    const getCat = async () => {
      const token = user && JSON.parse(user).token;

      const result = await axios.get(URL + "/api/demande/pro", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setDemandes(result.data);
      setLoading(false);
    };

    const getBan = async () => {
      setBannieres(banniere);
      setLoadingBan(false);
    };

    getBan();

    getCat();
  }, []);

  return (
    <Layout className=" bgwhite">
      <Header />

      <Content className="u-mar-top-xl ">
        <Layout className="bgapp  ">
          {bannieres != null && bannieres.length == 0 ? (
            <div
              style={{
                height: "250px",
                width: "100%",
                backgroundColor: "#ddd",
              }}
            ></div>
          ) : (
            <img src={bannieres != null && bannieres[0].image} />
          )}

          <Row className="home-container  u-pad-vertical-m">
            <Col xs={24} sm={24} md={24} lg={24} className="flex">
              <Col
                xs={24}
                sm={24}
                md={18}
                lg={18}
                className="u-pad-horizontal-l u-pad-vertical-s  "
              >
                <div className="myspace-nav-menu">
                  <div className="no-padding">
                    <nav>
                      <ul>
                        <li className="active">
                          <Link href="/myspace/spacepro" title="">
                            <i className="fa fa-briefcase"></i> Demandes recus
                          </Link>
                        </li>
                        <li>
                          <Link href="/myspace/spacepro" title="">
                            <i className="fa fa-reply-all"></i> Mes favoris
                          </Link>
                        </li>
                        <li>
                          <Link href="/myspace/spacepro" title="">
                            <i className="fa fa-briefcase"></i> Evaluations
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="bgwhite u-pad-l">
                  <h4>Filtrer les demandes</h4>

                  <Divider className="u-mar-top-xs" />

                  <Form
                    name="normal_login"
                    className="w100 w100res bgwhite  u-pad-horizontal-l  rad16 "
                    size="large"
                    form={form}
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="Echeance"
                          rules={[
                            {
                              required: true,
                              message: "Inserer le sous secteur",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Select placeholder="Echeance">
                            <Option value="Ce mois"> Ce mois</Option>
                            <Option value="Moins de 3 mois">
                              {" "}
                              Moins de 3 mois
                            </Option>
                            <Option value="Plus de 3 mois ">
                              Plus de 3 mois{" "}
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="typedemande"
                          rules={[
                            {
                              required: true,
                              message: "Objet de la demande",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Select placeholder="Objet de la demande">
                            <Option value="Avoir juste une idée des prix">
                              Avoir juste une idée des prix
                            </Option>
                            <Option value="Obtenir des devis et trouver une entreprise">
                              Obtenir des devis et trouver une entreprise
                            </Option>
                            <Option value="Trouver une entreprise en urgence">
                              Trouver une entreprise en urgence
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>

                  <Divider />

                  {demandes != null &&
                    demandes.map((dev) => (
                      <div key={dev._id} className="lead">
                        <h4 className="flex justbtw">
                          <Link
                          
                            href={"/detailsdevis/" + dev._id}
                            className="coltext av-heavy fs16"
                          >
                            {dev.typedemande} : {dev.category.name} |{" "}
                            {dev.subcategory.name}{" "}
                          </Link>
                          <a href="#">
                            <HeartFilled />
                          </a>
                        </h4>
                        <h6>
                          <span className="fs14">
                            <span className="semi-bold">Posté le </span>
                            {moment(dev.date_created).format("DD-MMM-Y")}{" "}
                          </span>
                          <span className="fs14">
                            <span className="postedBy par">Particulier</span>
                          </span>
                          <span className="fs14" style={{ marginLeft: "2px" }}>
                            {moment(dev.date_created).add(15, "days") <
                            moment() ? (
                              <>
                                <CloseCircleFilled style={{ color: "red" }} />{" "}
                                <span className="">Expiré</span>
                              </>
                            ) : (
                              <>
                                <CheckCircleOutlined
                                  style={{ color: "green" }}
                                />{" "}
                                <span className="">en cours</span>
                              </>
                            )}
                          </span>
                        </h6>
                        <p className="fs15">
                          Bonjour, <br /> {dev.description}{" "}
                        </p>
                        <Divider />
                      </div>
                    ))}
                </div>

                <Row className="u-pad-horizontal-s"></Row>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={6}
                lg={6}
                className="bgwhite u-mar-top-l"
              >
                <div className="widget profile  u-pad-s flex column justcenter itemcenter">
                  <div className="profile-logo-container">
                    <div className="profile-logo">
                      <img
                        className="imd-resonsive"
                        src={JSON.parse(Cookies.get("user")).avatar}
                        title="logo"
                        alt="erico smea"
                      />{" "}
                    </div>
                  </div>
                  <div className="profile-info-container center u-mar-top-s">
                    <h4 className="coltext av-heavy fs16 u-mar-bottom-s">
                      {JSON.parse(Cookies.get("user")).username}
                    </h4>
                    <div className=" fs12 u-mar-bottom-xs">
                      Membre depuis{" "}
                      {Cookies.get("user") &&
                        moment(JSON.parse(Cookies.get("user")).created).format(
                          "DD-MMM-Y"
                        )}
                    </div>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ rekest, response }) {
  const bannieres = await axios.get(URL + "/api/banniere/Espace pro");
  const banniere = bannieres.data;
  return {
    props: { user: Cookies.user || "", banniere },
  };
}
