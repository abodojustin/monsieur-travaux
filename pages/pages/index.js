import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Layout, Menu, Button, Dropdown, Row, Col, Input } from "antd";
const { Content } = Layout;
const { Search } = Input;
import Link from "next/link";
import { AppContext } from "../libs/ContextLib";
import "antd/dist/antd.css";
import axios from "axios";
import { URL } from "../urlapi";

export default function Base({ datas }) {
  //console.log(datas.slice(0, 6));
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [lenghtCat, setLenghtCat] = useState(6);
  const onSearch = (value) => {
    return value;
  };
  const router = useRouter();
  const [idcatpath, setIdCatPath] = useState("");

  /* async function ajoutSix(id){
    return (id+6);
  } */

  async function selectedPath(e) {
    e.preventDefault();
    console.log(idcatpath);
    router.push(idcatpath);
  }

  useEffect(() => {
    const getCat = () => {
      setCategories(datas);
      setLoading(false);
    };
    getCat();
  }, []);

  console.log(categories && categories.length);
  console.log(lenghtCat);

  return (
    <Layout className=" bgwhite">
      <Header />
      <Content className="u-mar-top-xl">
        <Layout className="bgwhite">
          <div className="container">
            <div className="login-box">
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  className="login-content left"
                >
                  <div className="content-form center">
                    <h1 className="u-mar-bottom-s">QUEL EST VOTRE PROJET ? </h1>
                    <div
                      className="vc_col-sm-6 wpb_column vc_column_container"
                      id="colChoixDevis"
                    >
                      <div className="vc_column-inner">
                        <div className="wpb_wrapper">
                          <div
                            className="wpb_raw_code wpb_content_element wpb_raw_html"
                            id="divchoixdevis"
                          >
                            <div className="wpb_wrapper">
                              <select
                                id="ChoixDevis"
                                onChange={(e) => setIdCatPath(e.target.value)}
                              >
                                {categories != null &&
                                  categories.map((secteur) => (
                                    <option
                                      value={"/devis/" + secteur._id}
                                      key={secteur._id}
                                    >
                                      {secteur.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="w-btn-wrapper align_none">
                            <Button
                              type="primary"
                              size="large"
                              className="rad4 itemcenter flex"
                              style={{ height: 50, marginLeft: 25 }}
                            >
                              <a
                                id="btnEstimation"
                                href={idcatpath}
                                onClick={selectedPath}
                              >
                                <span className="w-btn-label fs14 av-roman white u-pad-horizontal-s">
                                  ESTIMER MON PROJET
                                </span>
                              </a>
                            </Button>
                          </div>
                          <div className="wpb_raw_code wpb_raw_js">
                            <div className="wpb_wrapper"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*<div className="search-bar w90 w100res">
                      <AutoComplete
                        options={datas}
                        style={{ width: 350 }}
                        onChange={onSearch}
                        placeholder="Electricité, Plomberie"
                      />
                    </div> */}

                    <h2 className="u-mar-top-s">
                      MonsieurTravaux.ci vous met en relation avec les
                      <br /> <span>professionnels du bâtiment.</span>
                    </h2>
                  </div>
                </Col>
              </Row>
              <Row
                className="main-container home home-container"
                style={{ paddingBottom: 40 }}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <h5
                      className="u-pad-horizontal-m flex column itemcenter center u-mar-bottom-s"
                      style={{ marginTop: 40 }}
                    >
                      {`PROFITEZ D'UNE MISE EN RELATION GRATUITE AVEC JUSQU'À 4
                      PROFESSIONNELS SÉRIEUX ET QUALIFIÉS`}
                    </h5>

                    <h2 className="center fleat-lead"> COMMENT CA MARCHE ? </h2>
                  </Col>

                  <Row className="w100 u-mar-top-s">
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#1b252f",
                            borderRadius: "50%",
                            height: 112,
                            width: 112,
                          }}
                          className="flex itemcenter justcenter"
                        >
                          <img src="/etape1.svg" />
                        </div>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                          className="u-mar-top-xs"
                        >
                          {" "}
                          Vous déposez <br /> votre demande{" "}
                        </span>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={6}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#1b252f",
                            borderRadius: "50%",
                            height: 112,
                            width: 112,
                          }}
                          className="flex itemcenter justcenter"
                        >
                          <img src="/etape2.svg" />
                        </div>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                          className="u-mar-top-xs"
                        >
                          {" "}
                          Un conseiller <br /> vous appelle{" "}
                        </span>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={6}>
                      <div
                        className="u-mar-top-l-res"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#1b252f",
                            borderRadius: "50%",
                            height: 112,
                            width: 112,
                          }}
                          className="flex itemcenter justcenter"
                        >
                          <img src="/etape3.svg" />
                        </div>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                          className="u-mar-top-xs"
                        >
                          {" "}
                          Nous validons <br /> votre demande{" "}
                        </span>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={6}>
                      <div
                        className="u-mar-top-l-res"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#1b252f",
                            borderRadius: "50%",
                            height: 112,
                            width: 112,
                          }}
                          className="flex itemcenter justcenter"
                        >
                          <img src="/etape4.svg" />
                        </div>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                          className="u-mar-top-xs"
                        >
                          {" "}
                          Les sociétes <br /> vous contactent{" "}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Row>
              <section className="service">
                <div className="serv-head u-pad-m flex column itemcenter justcenter">
                  <h3>Sélectionnez votre projet</h3>
                  <img src="/fourchette.png" className="u-mar-bottom-s" />
                  <p>
                    + 15 000 artisans disponibles dans +80 secteurs d’activités.
                  </p>
                </div>

                <Row className="main-container home home-container">
                  <Row gutter={32}>
                    {categories != null &&
                      categories.slice(0, lenghtCat).map((secteur) => (
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={8}
                          className="serv-item w100 u-mar-botto-s"
                          key={secteur._id}
                        >
                          <Link
                            href={"/devis/" + secteur._id}
                            key={secteur._id}
                          >
                            <a>
                              <img
                                src={secteur.image}
                                className="w100"
                                height={150}
                                style={{ objectFit: "cover" }}
                              />

                              <div className="desc">
                                <p> {secteur.name}</p>

                                <Link
                                  href={"/devis/" + secteur._id}
                                  key={secteur._id}
                                >
                                  Devis gratuits
                                </Link>
                              </div>
                            </a>
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </Row>
                    {categories?.length < lenghtCat ? <div /> : 
                    <Button
                      type="primary"
                      size="large"
                      className="rad4 itemcenter flex nopad"
                      style={{ height: 45, border: "none", justifyContent: "center", alignItems: "center", margin: "auto" }}
                      onClick={()=> setLenghtCat(lenghtCat+6)}
                    >
                      <span className="fs14 av-roman white u-pad-horizontal-s">
                        VOIR PLUS
                      </span>
                    </Button>}
              </section>
              <section className="certifs">
                <div className="cert-head">
                  <h3 className="u-pad-s">POURQUOI NOUS CHOISIR ?</h3>
                  <img src="/cup.png" className="u-mar-bottom-s" />
                  <p className="u-pad-s">
                    Être le meilleur dans notre domaine signifie que nous nous
                    engageons sur chaque projet à apporter la meilleure qualité
                    de service à chacun sans exception.
                  </p>
                </div>

                <Row className="main-container home home-container nonedisplayres">
                  <Row gutter={32} className="w100" style={{ marginTop: 80 }}>
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <div>
                        <div className="right">
                          <span>
                            <i className="capitilise-text"></i>gestion humaine
                          </span>
                          <img src="https://www.yestravaux.com/template/yestravaux.com/assets/app/img/worker.png" />
                        </div>
                        <p className="desc1 right">
                          Avec des conseillers à votre écoute 5/7 jours de 09h00
                          à 18h30 par téléphone.
                        </p>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={8} offset={8}>
                      <div>
                        <div className="item-head ">
                          <img src="https://www.yestravaux.com/template/yestravaux.com/assets/app/img/money.png" />
                          <span> Service gratuit</span>
                        </div>
                        <p className="desc1">
                          Efficace et simple d’utilisation pour réaliser tous
                          vos travaux dans les meilleures conditions.
                        </p>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={8}>
                      <div>
                        <div className="item-head right">
                          <span>Projet sur mesure</span>
                          <img src="https://www.yestravaux.com/template/yestravaux.com/assets/app/img/star.png" />
                        </div>
                        <p className="desc1 right">
                          {`Avec un grand choix de secteurs d’activités et
                          d'sartisans certifiés dans toute la Côte d'ivoire.`}
                        </p>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={8} offset={8}>
                      <div>
                        <div className="item-head ">
                          <img src="https://www.yestravaux.com/template/yestravaux.com/assets/app/img/machine.png" />
                          <span>Artisans qualifiés</span>
                        </div>
                        <p className="desc1 ">
                          Certifiés par notre service monsieurtravaux.ci pour
                          répondre à tous vos projets et vos attentes.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Row>
              </section>
            </div>
          </div>
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const results = await axios.get(URL + "/api/category/all");
  const datas = results.data;
  return {
    props: {
      datas,
    },
  };
}
