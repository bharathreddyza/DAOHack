import React, { useState } from "react";
import { customHttpProvider } from "../app/superfluid";
import { useSelector } from "react-redux";


import Daomember from '../Assets/Daomember.png'
export default function Membership() {
  const state = useSelector((state)=>state.user)
  const [dummy,setDummy] = useState(true)
    const paywallObject = {
      "pessimistic": true,
      "locks": {
          "0xafffaaf187d5f309441eeba4195bee1fa94f62ac": {
             "network": 4,
             "name": "daohunt membership"
          }
      },
      "icon": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.10UUFNA8oLdFdDpzt-Em_QHaHa%26pid%3DApi&f=1",
      "callToAction": {
          "default": "Please join our dao to access our curated list of jobs and news"
      }
  
  }
  const paywall = `https://app.unlock-protocol.com/checkout?redirectUri=http://localhost:3000/news&paywallConfig=%7B%0A%20%20%20%20%20%20%22pessimistic%22%3A%20true%2C%0A%20%20%20%20%20%20%22locks%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%220xafffaaf187d5f309441eeba4195bee1fa94f62ac%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%22network%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22daohunt%20membership%22%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22icon%22%3A%20%22https%3A%2F%2Fexternal-content.duckduckgo.com%2Fiu%2F%3Fu%3Dhttps%253A%252F%252Ftse1.mm.bing.net%252Fth%253Fid%253DOIP.10UUFNA8oLdFdDpzt-Em_QHaHa%2526pid%253DApi%26f%3D1%22%2C%0A%20%20%20%20%20%20%22callToAction%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22default%22%3A%20%22Please%20join%20our%20dao%20to%20access%20our%20curated%20list%20of%20jobs%20and%20news%22%0A%20%20%20%20%20%20%7D%0A%20%20%0A%20%20%7D`

  return (
    <div>
        <div>
            <div>
              {state.isMember && <div>
                <h1 className="text-2xl font font-medium m-2">Deactivate Membership</h1>
               <div>
                 <h1 className="text-cxl font-medium">welcome</h1>
               <h1 className="p-1"> {state.user.slice(0,4)} ... {state.user.slice(-4)}</h1>
                 </div>
                 <a className="p-2 bg-purple-300  rounded-md m-2" href={paywall}>cancel</a>

              </div> }

              {!state.isMember && <div>
                <h1 className="text-2xl font font-medium m-2">Activate Membership</h1>
               <div>
                 <h1 className="text-cxl font-medium">welcome</h1>
               <h1 className="p-1"> {state.user.slice(0,4)} ... {state.user.slice(-4)}</h1>
               <h1>Become a member of daohunt to get access to exclusive job oppurtunities and newsletter</h1>
                 </div>
                <a className="p-2 bg-purple-300  rounded-md m-2" href={paywall}>Pay</a>

                </div>}

                {state.isMember &&
                <div className="flex items-center mt-20 ml-10 ">
                    <h1 className="text-3xl mr-20">Membership NFT:</h1>
                       <img  className="w-40 p-4 border rounded-md"  src={Daomember}/>
                   </div>}

            </div>
            
            </div>
            {/* <div>        <p>
          {" "}
          You are paying  <b>{flowRateDisplay !== " " ? flowRateDisplay : 0} Daix per/month </b>{" "}
        </p></div> */}
        </div>
   )
}
