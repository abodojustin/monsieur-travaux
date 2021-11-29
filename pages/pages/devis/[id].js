import React, { useState, useEffect } from "react";
import {
  Layout,
  Form,
  Row,
  Col,
  Divider,
  Input,
  Button,
  message,
  Select,
} from "antd";
import { URL } from "../../urlapi";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CheckCircleFilled } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;
import Cookies from "js-cookie";

export default function Devis({ item, datas, user }) {
  const [secteurid, setSecteurId] = useState(item);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [soussecteur, setSoussecteur] = useState(null);
  const [values, setValues] = useState(null);
  const [categories, setCategories] = useState(null);

  console.log(secteurid);
  const { Option } = Select;
  const [form] = Form.useForm();

  const changesecteur = (e) => {
    setSecteurid(e);
    setSoussecteur(null);
  };

  useEffect(() => {
    const getCat = async () => {
      setCategories(datas);
      setLoading(false);
    };
    getCat();
  }, []);

  async function onSubmit(values) {
    setValues(values);
    if (Cookies.get("user")) {
      try {
        setLoading(true);
        const token = JSON.parse(user).token;

        const result = await axios.post(URL + "/api/demande/create", values, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setStep(3);
        message.success("Enregistrement réussi!!");
        setLoading(false);
      } catch (e) {
        console.log(e.response);
        setLoading(false);
        message.warning("Erreur enregistrement!");
      }
    } else {
      setStep(2);
    }
  }

  return (
    <Layout className=" bgwhite">
      <Header />

      <Content className="u-mar-top-xl">
        <Layout className="bgapp">
          <Row className="home-container ">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              style={{
                display: "flex",
                backgroundColor: "#fff",
                marginTop: 50,
                marginBottom: 10,
              }}
            >
              <Col
                xs={24}
                sm={24}
                md={18}
                lg={18}
                style={{ borderRight: "2px solid #eee" }}
                className="u-pad-horizontal-l u-pad-vertical-s "
              >
                <h1
                  className="demande-title fs28 av-heavy u-mar-bottom-xxs coltext "
                  style={{ paddingTop: "5px" }}
                >
                  Demandez un Devis: <span className="bold secteur-nom"></span>
                </h1>
                <h4 className="sub-title fs16 coltext ">
                  {" "}
                  Profitez d&aposune mise en relation gratuite avec jusqu&aposà 4
                  professionnels sérieux et qualifiés{" "}
                </h4>

                {(Cookies.get("user")) ? (
                  <>
                    <div
                      className="u-pad-horizontal-s u-mar-vertical-m hidden-xs no-padding navbar flex itemcenter justcenter navbar-default "
                      style={{
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    >
                      <ul className="nav navbar-nav">
                        <li
                          className={
                            "etapes border-right-only text-16" +
                            (step == 1 ? "etape-active" : "")
                          }
                        >
                          {" "}
                          Description des travaux{" "}
                          <span
                            className={
                              step == 1 ? "etape-active" : "etape-non-active"
                            }
                          >
                            <span className="numero-etape">1</span>
                          </span>
                        </li>
                        <li
                          className={
                            "etapes border-right-only text-16" +
                            (step == 2 ? "etape-active" : "")
                          }
                        >
                          {" "}
                          Coordonnées{" "}
                          <span
                            className={
                              step == 2 ? "etape-active" : "etape-non-active"
                            }
                          >
                            <span className="numero-etape">2</span>
                          </span>{" "}
                        </li>
                        <li
                          className={
                            "etapes  text-16" +
                            (step == 3 ? "etape-active" : "")
                          }
                        >
                          {" "}
                          Validation{" "}
                          <span
                            className={
                              step == 3 ? "etape-active" : "etape-non-active"
                            }
                          >
                            <span className="numero-etape">3</span>
                          </span>{" "}
                        </li>
                      </ul>
                    </div>

                    <h2 id="dec" className="fs18 av-medium">
                      Décrivez votre besoin et recevez des devis gratuitement
                    </h2>

                    {step == 1 ? (
                      <Form
                        name="normal_login"
                        className="w100 w100res bgwhite  u-pad-horizontal-l u-pad-top-s rad16 "
                        size="large"
                        onFinish={onSubmit}
                        initialValues={{
                          remember: true,
                          secteur: secteurid,
                          soussecteur: soussecteur,
                        }}
                      >
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              name="secteur"
                              rules={[
                                {
                                  required: true,
                                  message: "--Secteur de la demande--",
                                },
                              ]}
                              className="u-mar-bottom-m"
                            >
                              <Select
                                placeholder="Secteur"
                                onChange={changesecteur}
                              >
                                {categories != null &&
                                  categories.map((u) => (
                                    <Option key={u._id} value={u._id}> {u.name} </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="soussecteur"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserer le sous secteur",
                                },
                              ]}
                              className="u-mar-bottom-m"
                            >
                              <Select placeholder="Sous secteur de la demande">
                                {categories != null &&
                                  categories
                                    .filter((u) => u._id == secteurid)[0]
                                    .subcategories.map((u) => (
                                      <Option key={u._id} value={u._id}> {u.name} </Option>
                                    ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              name="adresse"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserer une adresse",
                                },
                              ]}
                              className="u-mar-bottom-m"
                            >
                              <Input placeholder="Adresse du lieu du chantier" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="echeance"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserer une date",
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
                        </Row>

                        <Row gutter={24}>
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

                          <Col span={12}>
                            <Form.Item
                              name="appel"
                              rules={[
                                {
                                  required: true,
                                  message: "Heure d'appel",
                                },
                              ]}
                              className="u-mar-bottom-m"
                            >
                              <Select placeholder="Heure d'appel">
                                <Option value="En cours de journée">
                                  En cours de journée
                                </Option>
                                <Option value="Les matinées seulement">
                                  Les matinées seulement
                                </Option>
                                <Option value="Les après-midis seulement">
                                  Les après-midis seulement
                                </Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Form.Item
                          name="description"
                          rules={[
                            {
                              required: true,
                              message: "Insérer une description",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <TextArea rows={4} />
                        </Form.Item>

                        <p className="light italic fs12 av-roman ">
                          Un de nos téléopérateurs vous appellera depuis un des
                          numéros suivants <b>33 33 33</b> / <b>33 33 33</b>{" "}
                          pour recueillir toutes les informations relatives à
                          votre projet.
                        </p>

                        <Form.Item className="w100 u-mar-top-l u-mar-bottom-xxs right">
                          <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={loading}
                            className="rad8 w30"
                          >
                            <span className="fs18 av-heavy"> Valider </span>
                          </Button>
                        </Form.Item>
                      </Form>
                    ) : (
                      <Row className="u-pad-horizontal-s">
                        <div className="flex itemcenter justcenter w100">
                          <CheckCircleFilled
                            style={{
                              fontSize: "35px",
                              marginRight: 30,
                              color: "green",
                            }}
                          />

                          <p className="fs20 nomar">
                            Votre demande de devis a bien été enregistrée.{" "}
                            <br />
                            Merci pour votre confiance
                          </p>
                        </div>

                        <Divider />

                        <Col
                          xs={24}
                          sm={24}
                          md={22}
                          lg={8}
                          className="process-steps"
                        >
                          <div className="process-header">
                            <div className="triangle-step"></div>
                            <span className="step-number">1</span>
                            <div
                              className="img-container"
                              style={{ marginTop: "30px" }}
                            >
                              <Image src="/etape2noir.svg" alt="step 2" />
                            </div>
                          </div>

                          <div
                            className="process-content"
                            style={{ marginTop: "30px" }}
                          >
                            <h3
                              style={{ fontSize: "15px" }}
                              className="coltext av-heavy"
                            >
                              Un conseiller vous appelle
                            </h3>
                            <p>
                              Nous vous appelons pour vérifier et valider votre
                              demande
                            </p>
                          </div>
                        </Col>

                        <Col
                          xs={24}
                          sm={24}
                          md={22}
                          lg={8}
                          className="process-steps"
                        >
                          <div className="process-header">
                            <div className="triangle-step"></div>
                            <span className="step-number">2</span>
                            <div
                              className="img-container"
                              style={{ marginTop: "30px" }}
                            >
                              <Image src="/etape3noir.svg" alt="step 2" />
                            </div>
                          </div>

                          <div
                            className="process-content"
                            style={{ marginTop: "30px" }}
                          >
                            <h3
                              style={{ fontSize: "15px" }}
                              className="coltext av-heavy"
                            >
                              Votre demande est publiée
                            </h3>
                            <p>
                              Votre demande est envoyée à nos entreprises
                              partenaires{" "}
                            </p>
                          </div>
                        </Col>

                        <Col
                          xs={24}
                          sm={24}
                          md={22}
                          lg={8}
                          className="process-steps"
                        >
                          <div className="process-header">
                            <div className="triangle-step"></div>
                            <span className="step-number">3</span>
                            <div
                              className="img-container"
                              style={{ marginTop: "30px" }}
                            >
                              <Image src="/etape4noir.svg" alt="step 2" />
                            </div>
                          </div>

                          <div
                            className="process-content"
                            style={{ marginTop: "30px" }}
                          >
                            <h3
                              style={{ fontSize: "15px" }}
                              className="coltext av-heavy"
                            >
                              Les sociétés vous contactent
                            </h3>
                            <p>
                              Jusqu&aposà 4 entreprises vous contactent pour faire
                              une offre
                            </p>
                          </div>
                        </Col>

                        <div className="w100 flex itemcenter justcenter u-pad-m">
                          <Link href={"/myspace/spaceclient"}>
                            <Button
                              type="primary"
                              size="large"
                              className="rad8 w100"
                            >
                              <span className="fs18 av-heavy">
                                {" "}
                                Acceder à mon espace{" "}
                              </span>
                            </Button>
                          </Link>
                        </div>
                      </Row>
                    )}
                  </>
                ) : (
                  <div className="flex column  itemcenter justcenter u-pad-l">
                    <h1
                      className="demande-title fs18 av-heavy u-mar-bottom-xxs coltext "
                      style={{ paddingTop: "5px" }}
                    >
                      Veuillez vous Inscrire ou vous connecter avant de
                      continuer
                      <span className="bold secteur-nom"></span>
                    </h1>

                    <ul className="flex itemcenter justendres w100res grille13 u-mar-top-l ">
                      <li className="fs14 fs12res av-medium u-mar-right-m cursor">
                        <Link href="/sign/login" className="coltext">
                          SE CONNECTER
                        </Link>
                      </li>
                      <li className="fs14 fs12res av-medium u-mar-right-m cursor nomarres">
                        OU{" "}
                      </li>
                      <li className="nonedisplayres">
                        <Link href="/sign/register">
                          <Button
                            type="primary"
                            size="large"
                            className="rad4 w100 itemcenter flex nopad"
                            style={{ height: 45 }}
                          >
                            <span className="fs14 av-roman white u-pad-horizontal-s">
                              {" "}
                              S&aposINSCRIRE{" "}
                            </span>
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </Col>

              <Col xs={24} sm={24} md={6} lg={6}>
                <div className="with bgpos border u-pad-s">
                  <div>
                    <div className="row no-margin">
                      <div className="col-md-12 m-10">
                        <h4 className="av-heavy coltext fs18">
                          Comment ça marche?
                        </h4>
                      </div>
                    </div>
                    <div
                      className="u-mar-top-s"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <Image src="/etape1noir.svg" alt="Demande" />
                        </div>
                        <div className="u-mar-left-xs">
                          <span className="text-12 justified">
                            {" "}
                            Vous détaillez de votre projet dans le formulaire
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="u-mar-top-s"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <Image src="/etape2noir.svg" alt="Demande" />
                        </div>
                        <div className="u-mar-left-xs">
                          <span className="text-12 justified">
                            {" "}
                            Un conseiller vous appelle pour valider votre
                            demande
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="u-mar-top-s"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <Image src="/etape3noir.svg" alt="Demande" />
                        </div>
                        <div className="u-mar-left-xs">
                          <span className="text-12 justified">
                            {" "}
                            Nos partenaires vous contactent et envoient leurs
                            offres
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="u-mar-top-s"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <Image src="/etape4noir.svg" alt="Demande" />
                        </div>
                        <div className="u-mar-left-xs">
                          <span className="text-12 justified">
                            {" "}
                            Vous comparez et choisissez l&aposoffre qui vous
                            convient
                          </span>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row u-mar-top-m">
                      <div className="col-md-12 m-10">
                        <h4 className="av-heavy coltext fs18">Vos avantages</h4>
                      </div>
                    </div>
                    <div
                      className="row no-margin"
                      style={{ marginBottom: "5px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <CheckCircleFilled
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        </div>
                        <div className="u-mar-left-s ">
                          <span className="text-12">Service 100% gratuit</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row no-margin"
                      style={{ marginBottom: "5px" }}
                    >
                      <div className="flex itemcenter">
                        <div className="">
                          <CheckCircleFilled
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        </div>
                        <div className="u-mar-left-s">
                          <span className="text-12">Sans engagement</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row no-margin"
                      style={{ marginBottom: "5px" }}
                    >
                      <div className="flex itemcenter ">
                        <div>
                          <CheckCircleFilled
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        </div>
                        <div className="u-mar-left-s">
                          <span className="text-12">
                            Plus de 624 demandes traitées
                          </span>
                        </div>
                      </div>
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

export async function getStaticPaths() {
  const results = await axios.get(URL + "/api/category/all");
  const datas = results.data;

  const paths = datas.map((secteur) => {
    return {
      params: { id: secteur._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const results = await axios.get(URL + "/api/category/all");
  const datas = results.data;
  return {
    props: {
      item: id,
      datas,
      user: Cookies.user || "",
    },
  };
}
