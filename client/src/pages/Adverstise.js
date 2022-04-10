import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import axios from 'axios';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();


export default  function Adverstise() {
    const [recipient, setRecipient] = useState("0x8c0Db915Bb69E58751cF1170ce5df0342670b4D4");
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [flowRate, setFlowRate] = useState("");
    const [flowRateDisplay, setFlowRateDisplay] = useState("463");
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


  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
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

    function calculateFlowRate(amount) {
        if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
          alert("You can only calculate a flowRate based on a number");
          return;
        } else if (typeof Number(amount) === "number") {
          if (Number(amount) === 0) {
            return 0;
          }
          const amountInWei = ethers.BigNumber.from(amount);
          const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
          const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
          return calculatedFlowRate;
        }
      }

      const handleRecipientChange = (e) => {
        setRecipient(() => ([e.target.name] = e.target.value));
      };

      const handleFlowRateChange = (e) => {
        setFlowRate(() => ([e.target.name] = e.target.value));
        // if (typeof Number(flowRate) === "number") {
        let newFlowRateDisplay = calculateFlowRate(e.target.value);
        setFlowRateDisplay(newFlowRateDisplay.toString());
        // setFlowRateDisplay(() => calculateFlowRate(e.target.value));
        // }
      };

      //where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate) {

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider
      });
    
      const results = await sf.query.listAllSuperTokens(
        { isListed: true },
        { skip: 5, take: 150 },
        {
          orderBy: "createdAtBlockNumber",
          orderDirection: "desc"
        });
    
    
      const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
    
      try {
        // console.log(1,flowRate,recipient)
        const createFlowOperation = sf.cfaV1.createFlow({
          flowRate: flowRate,
          receiver: recipient,
          superToken: DAIx
          // userData?: string
        });
    
        console.log("Creating your stream...");
    
        const result = await createFlowOperation.exec(signer);
        console.log(result);
    
        console.log(
          `Congrats - you've just created a money stream!
        View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
        Network: matic
        Super Token: DAIx
        Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
        Receiver: ${recipient},
        FlowRate: ${flowRate}
        `
        );
      } catch (error) {
        console.log(
          "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
        );
        console.error(error);
      }
    
      
    }
  
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


        <div>
            <div className='border p-4 '>
                <h1 className='text-2xl'>Create Super Stream</h1>
       <form className=''>
         
           {/* <input
            name="flowRate"
            value={flowRate}
            className="w-60 p-4 m-3"
            onChange={handleFlowRateChange}
            placeholder="Enter a flowRate in wei/second"
          ></input> */}
         <button className='bg-purple-300 p-4 m-2 rounded-md'
          onClick={() => {
            createNewFlow("0x8c0Db915Bb69E58751cF1170ce5df0342670b4D4", flowRate);
          
          }}
        >          Click to Create Your Stream
        </button>
       </form>
       <div className="">
          <p>Your are going to pay</p>
          <p>
            <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
          </p>
        </div>
            </div>
        </div>
    </div>
  )
}
