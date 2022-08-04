import React, { useEffect, useState } from "react";
import { Skeleton, Card } from "antd";
const { Meta } = Card;

const CardPokemon = (props) => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    const getPokemon = async (url) => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            setPokemon({ ...result });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPokemon(props.url);
    }, []);

    return (
        <div>
            {loading ? (
                <Skeleton.Image active={true} />
            ) : (
                <Card
                    style={{
                        width: 300,
                    }}
                    cover={
                        <img
                            loading="lazy"
                            alt="example"
                            src={pokemon.sprites.other.home.front_default}
                            style={{
                              width: "auto",
                              height: 190,
                              margin: "auto",
                              padding: 8,
                          }}
                        />
                    }
                >
                    <Meta
                        style={{justifyContent: "center"}}
                        title={props.name}
                    />
                </Card>
            )}
        </div>
    );
};

export default CardPokemon;
