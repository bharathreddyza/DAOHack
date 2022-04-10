import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import axios from 'axios';

export default  function Adverstise() {
    const [state,setState]= useState({
        "redirect":"",
        "image":""
    });

    const setStates =(e) =>{
        setState({
            ...state,
            redirect:e.target.value
        })
    }

    const setImage = (e)=> {
        setState({
            ...state,
            image:e
        })
    }

     const testAuthentication = () => {
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        return axios
            .post(url,state, {
                headers: {
                    Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MGU5NzEzMC02MmIyLTQ2MTYtOWY3Zi05YjUwN2U0OWQ5MjkiLCJlbWFpbCI6ImJoYXJhdGhyZWRkeXphQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxZDQyNmFiOWUxMmU5MjVmNGM0ZSIsInNjb3BlZEtleVNlY3JldCI6IjhhYzE3ZmI4YTMzODFiMzRmN2YxNmY4YTg0YzU1YmFjMjJhY2I2ZDJjNTM5YWE5YjgzMGEwZjJiOTllZjQ2MjkiLCJpYXQiOjE2NDk1OTE5MzZ9.UqFhHYJwxRCnqd2m2CcLPDZ3xiPo-R8-dpQaGKmgqkY",
                    pinata_api_key: '1d426ab9e12e925f4c4e'
                    // pinata_secret_api_key: '8ac17fb8a3381b34f7f16f8a84c55bac22acb6d2c539aa9b830a0f2b99ef4629'
                }
                
            })
            .then(function (response) {
                //handle your response here
                console.log(response)
                setHash(response.data.IpfsHash)
            })
            .catch(function (error) {
                //handle error here
            });
    };
  
    const [hash,setHash]=useState('')
    // const provider = new ethers.providers.InfuraProvider(
    //     "kovan",
    //     "62052ff1d12f437c9f09f2c31bd1e7a5"
    //   );
    //   const sf = await Framework.create({
    //     networkName: "kovan",
    //     provider
    //   });

    //   const signer = sf.createSigner({ privateKey: "d14af01380a436ded49f911769479b2de91ecc120f461dd75f03e974dca91dde", provider });
// load the usdcx SuperToken via the Framework
// const usdcx = sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// // create an approve operation
// const approveOperation = usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() });

// // execute the approve operation, passing in a signer
// const txn = await approveOperation.exec(signer);

// // wait for the transaction to be confirmed
// const receipt = await txn.wait();

// // or you can create and execute the transaction in a single line
// const approveTxn = await usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() }).exec(signer);
// const approveTxnReceipt = await approveTxn.wait();
  return (
    <div>
        <div>
            <h1 className='text-2xl font-medium '> Advertise with us</h1>
        </div>
         <form onSubmit={()=>testAuthentication()}>

        <div className='flex justify-center rounded-md mt-20 '>
            <h1 className='p-1 text-lg'>upload image</h1>
            <input accept="image/*" onChange={(e)=>setImage(e.target.files)} className='p-1' type="file"/>
        </div>
        <div className='flex justify-center rounded-md  '>
            <h1 className='p-1 text-lg'>Redirect Url</h1>
            <input value={state.redirect} onChange={(e)=>setStates(e)} className='border p-1' type="text"/>
        </div>
        <div><button type="submit" className='p-1 bg-purple-400 rounded-md '>create hash</button></div>

        </form>
        <div>
            <h1>your advertisment Hash</h1>
            <input className='border rounded-md p-1 ' value={hash}/>
        </div>

    </div>
  )
}
