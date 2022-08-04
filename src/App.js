import { Col, Row, Button, Layout } from "antd";
import { useEffect, useState } from "react";
import CardPokemon from "./components/Card";
import "antd/dist/antd.min.css";
import { Content, Header } from "antd/lib/layout/layout";

const App = () => {
    const [data, setData] = useState([]);
    const [urlData, setUrlData] = useState(
        "https://pokeapi.co/api/v2/pokemon/"
    );
    const [nextUrl, setNextUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAPI = async (urlData) => {
        try {
            const response = await fetch(urlData);
            const pokemon = await response.json();
            setData((prev) => [...prev, ...pokemon.results]);
            setNextUrl(pokemon.next);
            setLoading(false);
            console.log(pokemon);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAPI(urlData);
    }, [urlData, loading]);

    return (
        <Layout style={{width: "100%"}}>
            <Header style={{fontSize: "24px", color: "white"}}>PokeDex</Header>
            <Content>
                <Row justify="space-evenly" gutter={[16, 16]} >
                    {data.map((item) => (
                        <Col xs={6}>
                            <CardPokemon
                                name={
                                    item.name[0].toUpperCase() +
                                    item.name.slice(1)
                                }
                                url={item.url}
                            />
                        </Col>
                    ))}
                </Row>
                <div style={{ textAlign: "center", margin: 16 }}>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() => setUrlData(nextUrl)}
                    >
                        Show More
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};

export default App;
