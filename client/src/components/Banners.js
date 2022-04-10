import React,{useState} from 'react'
import Banner2 from '../Assets/banner2.jpeg'

const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

export default function Banners() {

    const [recipient, setRecipient] = useState("");
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [flowRate, setFlowRate] = useState("");
    const [flowRateDisplay, setFlowRateDisplay] = useState("");
  
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

async function getUserStreams(){
  const sf = await Framework.create({
    networkName: "kovan",
    provider
  }); 
  const results = await sf.query.listStreams();
    console.log(results)
};
 
   
  


async function getUserInteractedSuperTokens(){
  const sf = await Framework.create({
    networkName: "kovan",
    provider
  }); 
  const results = await sf.query.listUserInteractedSuperTokens();
    console.log(results)
}
getUserStreams()


  return (
    <div>
      <div className='flex  justify-center'>
          <img className='' src={Banner2}/>
      </div>
    </div>
  )
  }
