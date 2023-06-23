import './home.css'
import NavBar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState, useEffect } from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Home() {


    const [prEachUser, setPrEachUser] = useState([])
    const [sumPrOpen, setSumPrOpen] = useState([])
    const [sumPrClosed, setSumPrClosed] = useState([])
    const [sumPrDraft, setSumPrDraft] = useState([])
    

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
                setSumPrOpen(data.sumOpen)
                setSumPrClosed(data.sumClosed)
                setSumPrDraft(data.sumDraft)
                

            })
            .catch((error) => console.log(error))

    }, [])

    return (


        <div className="container-fluid">
            <div className="row flex-nowrap">
                <NavBar />
                <div className="col py-4">

                    <div Style='margin-right: 8%; margin-left: 6%'>                   
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div class="col">
                                <div class="card">
                                    <div className="card-header" Style="background-color: #4069FF; color: #FFFFFF; font-weight: bold; text-align: center;">
                                        PR Abertos
                                    </div>
                                    <div class="card-body" Style="font-weight: bold; text-align: center;">
                                        {sumPrOpen}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <div className="card-header" Style="background-color: #4069FF; color: #FFFFFF; font-weight: bold; text-align: center;">
                                        PR Fechados
                                    </div>
                                    <div class="card-body" Style="font-weight: bold; text-align: center;">
                                        {sumPrClosed}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <div className="card-header" Style="background-color: #4069FF; color: #FFFFFF; font-weight: bold; text-align: center;">
                                        PR Draft
                                    </div>
                                    <div class="card-body" Style="font-weight: bold; text-align: center;">
                                        {sumPrDraft}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <div className="card-header" Style="background-color: #4069FF; color: #FFFFFF; font-weight: bold; text-align: center;">
                                        Total PR
                                    </div>
                                    <div class="card-body" Style="font-weight: bold; text-align: center;">
                                        {sumPrClosed+sumPrOpen+sumPrDraft}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div> 

                    &ensp;
                    &ensp;
                    &ensp;
                    &ensp;
               

                    

                        {/* <BarChart
                            width={1040}
                            height={450}
                            data={prEachUser}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="user" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey= 'sumOfPrOpen' fill="#204ADB" />
                            <Bar dataKey= 'sumPrToReview' fill="#e5894b" />

                        </BarChart> */}



                        <BarChart
                            width={1000}
                            height={500}
                            data={prEachUser}
                            layout="vertical"
                            margin={{
                                top: 5,
                                right: 30,
                                left: 100,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="user"  type="category"/>
                            <Tooltip />
                            <Legend />

                            <Bar dataKey= 'sumOfPrOpen' fill="#204ADB" />
                            <Bar dataKey= 'sumPrToReview' fill="#e5894b" />

                        </BarChart>

              




                </div>
            </div>
        </div>
    )
}

export default Home;