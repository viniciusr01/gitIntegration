import './home.css'
import NavBar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState, useEffect } from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Home() {


    const [prEachUser, setPrEachUser] = useState([])
    const [sumPR, setSumPR] = useState([])

    useEffect(() => {

        fetch(`http://localhost:5000/pull/consolidado`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setPrEachUser(data.prEachUser)
                setSumPR(data.sum)
                console.log(data.prEachUser)

            })
            .catch((error) => console.log(error))

    }, [])

    return (


        <div className="container-fluid">
            <div className="row flex-nowrap">
                <NavBar />
                <div className="col py-3">

                    <div className="card-group">

                        <div className="card">
                            <div className="card-header">
                                Pull Requests Abertos
                            </div>
                            <div className="card-body">
                                {sumPR}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                Quantindade de usuários
                            </div>
                            <div className="card-body">
                                11
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                Title
                            </div>
                            <div className="card-body">
                                Info
                            </div>
                        </div>

                        <div className="card">
                            <div class="card-header">
                                Title
                            </div>
                            <div className="card-body">
                                Info
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                Title
                            </div>
                            <div className="card-body">
                                Info
                            </div>
                        </div>

                    </div>
                    &ensp;
                    &ensp;
                    &ensp;

                    <div>

                        <BarChart
                            width={900}
                            height={400}
                            data={prEachUser}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            {prEachUser.map(user =>
                                <Bar dataKey={Object.keys(user)[0]} fill="#8884d8" />
                            )}


                            {/* <Bar dataKey="pedroLagares" fill="#8884d8" />
                                                <Bar dataKey="HeitorPena" fill="#82ca9d" />
                                                <Bar dataKey="DouglasRPaula" fill="#82ca9d" />
                                                <Bar dataKey="CaioVieira-dev" fill="#82ca9d" />
                                                <Bar dataKey="LHGS2001" fill="#82ca9d" />
                                                <Bar dataKey="CamsCampos" fill="#82ca9d" />
                                                <Bar dataKey="vbarcellos" fill="#82ca9d" />
                                                <Bar dataKey="antoniobritto07" fill="#82ca9d" />
                                                <Bar dataKey="JoaoAraujoGato" fill="#82ca9d" />
                                                <Bar dataKey="joaoassisb" fill="#82ca9d" />
                                                <Bar dataKey="nerissa-aguirre" fill="#82ca9d" /> */}

                        </BarChart>

                    </div>




                </div>
            </div>
        </div>
    )
}

export default Home;