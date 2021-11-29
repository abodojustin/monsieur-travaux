import React, { useState, Fragment, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  Form,
  Upload,
  Row,
  Col,
  message,
  Input,
  Layout,
  Button,
  Select,
} from "antd";
import axios from "axios";
import { URL } from "../../urlapi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "antd/dist/antd.css";
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Search } = Input;

export default function RegisterPro({ user, banniere }) {
  const [loading, setLoading] = useState(false);
  const [loadingBan, setLoadingBan] = useState(false);
  const [send, setSend] = useState(false);
  const [bannieres, setBannieres] = useState(null);

  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState(null);

  const { Option } = Select;
  const [form] = Form.useForm();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file) => {
    file.preview = await getBase64(file.originFileObj);
  };
  const dum = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  useEffect(() => {
    const getCat = async () => {
      const token =
        Cookies.get("user") && JSON.parse(Cookies.get("user")).token;

      const result = await axios.get(URL + "/api/category/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setCategories(result.data);
      setLoading(false);
    };

    const getBan = async () => {
      setBannieres(banniere);
      setLoadingBan(false);
    };

    getCat();
    getBan();
  }, []);

  async function onSubmit(values) {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("rc", values.rc);
    data.append("site", values.site);
    data.append("phone", values.phone);
    data.append("adresse", values.adresse);
    data.append("personne", values.personne);
    data.append("password", values.password);
    data.append("category", values.category);
    data.append("image", values.upload.file.originFileObj);

    try {
      setLoading(true);
      const result = await axios.post(
        URL + "/api/user/createentreprise",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSend(true);

      message.success("Enregistrement réussi!!");
      setLoading(false);
    } catch (e) {
      console.log(e.response);
      setLoading(false);
      message.warning("Erreur enregistrement!");
    }
  }

  const handleChange = ({ fileList }) => setFileList(fileList);
  return (
    <Layout className=" bgwhite">
      <Header />

      <Content className="u-mar-top-xl">
        <Layout className="bgwhite">
          <Row>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="nonedisplayres"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {bannieres != null &&
                  bannieres.map((u) => (
                    <div key={u.image}>
                      <img src={u.image} style={{ borderRadius: "8px" }} />
                    </div>
                  ))}
              </Carousel>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={16}
              lg={16}
              className="login-content right"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {send ? (
                <h1 className="av-heavy fs24 u-mar-bottom-s coltext grille25 center">
                  {" "}
                  Veuillez Veuillez Verifier <br /> votre Adresse email pour
                  valider votre compte !
                </h1>
              ) : (
                <div className="flex column w100 h100  itemcenter justcenter ">
                  <Form
                    name="normal_login"
                    className="login-form w90 w100res bgwhite  u-pad-horizontal-l u-pad-top-s rad16 "
                    size="large"
                    form={form}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onSubmit}
                  >
                    <div className="flex justbtw itemcenter">
                      <h1 className="av-heavy fs24 u-mar-bottom-s coltext grille25 center">
                        {" "}
                        Crééer un compte Pro{" "}
                      </h1>

                      {/* <img src={logo} className="w15 u-mar-bottom-xs grille"/> */}
                    </div>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre nom",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Input placeholder="Nom de l'entreprise" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="personne" className="u-mar-bottom-m">
                          <Input placeholder="Personne de contact(nom,prenom)" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre numéro de telephone",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Input placeholder="Télephone" maxLength={15} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="adresse"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre numéro de telephone",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Input placeholder="Adresse, CP Ville" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              type: "email",
                              required: true,
                              message: "Insérer un email correcte",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="rc" className="u-mar-bottom-m">
                          <Input
                            placeholder="Avez-vous un RC, un CC, des certificats ? Labels ?
"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item name="site" className="u-mar-bottom-m">
                          <Input placeholder="Site web" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre mot de passe!",
                            },
                          ]}
                          className="u-mar-bottom-xs flex itemcenter justcenter"
                        >
                          <Input type="password" placeholder="Mot de passe" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        {categories != null && (
                          <Fragment>
                            <Form.Item
                              name="category"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserer un secteur",
                                },
                              ]}
                            >
                              <Select placeholder="Secteur d'activité'">
                                {categories.map((u) => (
                                  <Option key={u._id} value={u._id}> {u.name} </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Fragment>
                        )}
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="upload"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre logo",
                            },
                          ]}
                        >
                          <Upload
                            customRequest={dum}
                            onChange={handleChange}
                            listType="picture"
                            onPreview={handlePreview}
                          >
                            {fileList.length == 0 && (
                              <Button
                                className="w100"
                                icon={<UploadOutlined />}
                              >
                                Ajouter votre logo
                              </Button>
                            )}
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={6} />
                      <Col span={12}>
                        <Form.Item className="w100 u-mar-top-l u-mar-bottom-xxs">
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            className="rad8 w100"
                          >
                            <span className="fs18 av-heavy">
                              {" "}
                              S&aposinscrire maintenant{" "}
                            </span>
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>

                  <div
                    className="fl-r w100  av-roman fs12"
                    style={{ textAlign: "center" }}
                  >
                    En vous inscrivant vous acceptez les
                    <a className="login-form-forgot fs12" href="">
                      conditions d&aposutilisation
                    </a>{" "}
                    <br />, vous avez pris connaissance de notre{" "}
                    <a className="login-form-forgot fs12" href="">
                      charte de qualité
                    </a>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ rekest, response }) {
  const result = await axios.get(URL + "/api/banniere/Page d'inscription");
  const banniere = result.data;
  return {
    props: { user: Cookies.user || "", banniere },
  };
}
