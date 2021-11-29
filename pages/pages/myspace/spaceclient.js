import React, { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import { Layout, Row, Col, Input, Divider } from "antd";
import moment from "moment";
import "moment/locale/fr";
import Link from "next/link";
import axios from "axios";
import { URL } from "../../urlapi";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import { useAppContext } from "../../libs/ContextLib";
import { ControlOutlined, DeleteFilled } from "@ant-design/icons";
const { Content } = Layout;
const { Search } = Input;
const { TextArea } = Input;

export default function DevisValid({ user, banniere }) {
    console.log(user)
  const [loading, setLoading] = useState(false);
  /* const router = useRouter();
  const { setUsername } = useAppContext();
  const { setPermissions } = useAppContext(); */
  const [demandes, setDemandes] = useState(null);
  const [loadingBan, setLoadingBan] = useState(false);

  const [bannieres, setBannieres] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getCat = async () => {
      const token = user && JSON.parse(JSON.stringify(user)).token;

      const demandes = await axios.get(URL + "/api/demande/client", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setDemandes(demandes);
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
                          <Link href="/myspace/spaceclient" title="">
                            <a><i className="fa fa-briefcase"></i> Mes demandes</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/myspace/devis" title="">
                            <a><i className="fa fa-reply-all"></i> Dévis{" "}</a>
                          </Link>
                        </li>
                        {/*           <li><Link href="/myspace/user" title=""><i className="fa fa-wrench"></i> Paramètres du compte</Link></li>
                         */}
                        {/*           <li><Link href="/myspace/suivi" title=""><i className="fa fa-briefcase"></i> Suivi</Link></li>
                         */}{" "}
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="bgwhite u-pad-l">
                  {demandes != null &&
                    demandes.map((dev) => (
                      <>
                        <div className="row lead no-margin flex justbtw">
                          <div className="col-md-10 no-padding">
                            <h4 className="red-text no-margin">
                              <a href="/leads/10237-" title=""></a>
                            </h4>
                            <h5 className="fs14">
                              <span className="av-heavy">créé le </span>{" "}
                              {moment(dev.date_created).format("DD-MMM-Y")}{" "}
                              <br />
                              <span className="av-heavy">Etat</span>{" "}
                              <span className="red">{dev.status}</span>
                            </h5>
                            <p className="av-roman fs14">{dev.description}</p>
                          </div>
                          <div className="flex column">
                            <Link href={"/"} className="u-mar-bottom-s">
                              <span className="red fs14">
                                {dev.devis.length} devis reçus
                              </span>
                            </Link>

                            <Link href={"/"} className="fs14 coltext">
                              <a><DeleteFilled color={"red"} /> Supprimer</a>
                            </Link>
                          </div>
                        </div>

                        <Divider />
                      </>
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
                        src="/avatar.png"
                        title="logo"
                        alt="erico smea"
                      />{" "}
                    </div>
                  </div>
                  <div className="profile-info-container center u-mar-top-s">
                    <h4 className="coltext av-heavy fs16 u-mar-bottom-s">
                      {user.username}{" "}
                    </h4>
                    <div className=" fs12 u-mar-bottom-xs">
                      Membre depuis
                      {Cookies.get("user") &&
                        moment(user.date_created).format("DD-MMM-Y")}
                    </div>

                    <span className="av-mediumfs16 ">
                      <Link href="/myspace/user/moncompte" title="mon compte">
                        <a>ajouter votre adresse{" "}</a>
                      </Link>{" "}
                    </span>
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
    const bannieres = await axios.get(URL + "/api/banniere/Espace client");
  const banniere = bannieres.data;
  return {
    props: { user: Cookies.user || "", banniere },
  };
}

