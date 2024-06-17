// components/ChromaDBInteraction.js
import { useState } from "react";

const ChromaDBInteraction = () => {
    const [documents, setDocuments] = useState([]);
    const [queryResult, setQueryResult] = useState(null);
    const [queryText, setQueryText] = useState("");
    const [loading, setLoading] = useState(false);

    const addDocuments = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/chromadb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documents: [`Pokémon[a] is a Japanese media franchise consisting of video games, animated series and films, a trading card game, and other related media. The franchise takes place in a shared universe in which humans co-exist with creatures known as Pokémon, a large variety of species endowed with special powers. The franchise's target audience is children aged 5 to 12,[2] but it is known to attract people of all ages.[3][4][5][6]

The franchise originated as a pair of role-playing games developed by Game Freak, from an original concept by its founder, Satoshi Tajiri. Released on the Game Boy on February 27, 1996, the games became sleeper hits and were followed by manga series, a trading card game, and anime series and films. From 1998 to 2000, Pokémon was exported to the rest of the world, creating an unprecedented global phenomenon dubbed "Pokémania". By 2002, the craze had ended, after which Pokémon became a fixture in popular culture, with new products being released to this day. In the summer of 2016, the franchise spawned a second craze with the release of Pokémon Go, an augmented reality game developed by Niantic. Pokémon has since been estimated to be the world's highest-grossing media franchise and one of the best-selling video game franchises.

Pokémon has an uncommon ownership structure.[7] Unlike most IPs, which are owned by one company, Pokémon is jointly owned by three: Nintendo, Game Freak, and Creatures.[1] Game Freak develops the core series role-playing games, which are published by Nintendo exclusively for their consoles, while Creatures manages the trading card game and related merchandise, occasionally developing spin-off titles. The three companies established The Pokémon Company (TPC) in 1998 to manage the Pokémon property within Asia. The Pokémon anime series and films are co-owned by Shogakukan. Since 2009, The Pokémon Company International (TPCi) subsidiary of TPC has managed the franchise in all regions outside of Asia.[8]`
                    ],
                    ids: ["pokemon"],
                }),
            });
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const queryDocuments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/chromadb?queryTexts=${encodeURIComponent(queryText)}&nResults=5`);
            const data = await response.json();
            setQueryResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <button
                onClick={addDocuments}
                className="bg-blue-500 text-red px-4 py-2 rounded-md"
                disabled={loading}
            >
                {loading ? "Loading..." : "Add Documents"}
            </button>

            <div>
                <input
                    type="text"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Enter query text"
                    className="border p-2 rounded-md w-full"
                />
                <button
                    onClick={queryDocuments}
                    className="bg-green-500 text-red px-4 py-2 rounded-md mt-2"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Query Documents"}
                </button>
            </div>

            {queryResult && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Query Results:</h3>
                    <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(queryResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ChromaDBInteraction;
