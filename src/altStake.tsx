
import { Data, BrowserWallet, Transaction, resolvePaymentKeyHash, KoiosProvider} from '@meshsdk/core';
import {mConStr0} from "@sidan-lab/sidan-csl";

import  { scriptAddr, contract } from "./logic/contract";
import { UTxO } from '@harmoniclabs/plu-ts';
import { Value } from '@emurgo/cardano-serialization-lib-nodejs';
import { validateHeaderName } from 'http';


async function Deposit(w: BrowserWallet) {
    //  tx
    let userAddress = await w.getUsedAddress();
    let userAddressStr = userAddress.to_bech32('addr').toString();
    let contractAddress = scriptAddr.toString();
    const userWalletKeyhash = resolvePaymentKeyHash(userAddressStr);
    let tadaUnit = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441";

    // To-do: move the api key used in fetching utxo's to .env file

    const blockchainProvider = new KoiosProvider("api", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTlseXFrYWQ0bDdsOG1lanZsY3I4bGwza21rdm1wamhkZGh2dGdmeGcwMjk0bmN4azdqcTciLCJleHAiOjE3MzQ5NzI1NTYsInRpZXIiOjEsInByb2pJRCI6InRoZWFkYXBybyJ9.rmVUtYYYaL18XaRP1OTecIg7I_dw4U75blG8avt2Wzs");
    const assetHex = "54414441";
    const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb"
    const utxos = await blockchainProvider.fetchAddressUTxOs(
    contractAddress,
    policyId + assetHex
    );
    const tx = new Transaction({ initiator: w })
    await tx.sendAssets(contractAddress, [{
        quantity: "1", // the quantity of tada token, i.e. takes input from front end
        // unit: "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441",
    }])

    

    const unsignedTx = await tx.build();
    const signedTx = await w.signTx(unsignedTx);
    const txHash = await w.submitTx(signedTx);
    console.log("txHash", txHash);
}


export const Deposit6 = async function(name: string) {
    let w = await BrowserWallet.enable(name);
    
     // To-do: store users info used in depositing, to be used when withdrawing

     Deposit(w)
}

export const Deposit12 = async function(name: string) {
    let w = await BrowserWallet.enable(name);

    // To-do: store users info used in depositing, to be used when withdrawing

    Deposit(w)
}
export const Deposit18 =async function(name: string) {
    let w = await BrowserWallet.enable(name);

    // To-do: store users info used in depositing, to be used when withdrawing

    Deposit(w)
}


// txBuilder = new TxBuilder("mainnet")


export const Withdraw = async function(name: string) {
      //  tx
      let w = await BrowserWallet.enable(name);
      let userAddress = await w.getUsedAddress();
      let userAddressStr = userAddress.to_bech32('addr').toString();
      let contractAddress = scriptAddr.toString();
      const userWalletKeyhash = resolvePaymentKeyHash(userAddressStr);
      let tadaUnit = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441";
  
      // To-do: move the api key used in fetching utxo's to .env file
  
      const blockchainProvider = new KoiosProvider("api", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTlseXFrYWQ0bDdsOG1lanZsY3I4bGwza21rdm1wamhkZGh2dGdmeGcwMjk0bmN4azdqcTciLCJleHAiOjE3MzQ5NzI1NTYsInRpZXIiOjEsInByb2pJRCI6InRoZWFkYXBybyJ9.rmVUtYYYaL18XaRP1OTecIg7I_dw4U75blG8avt2Wzs");
      const assetHex = "54414441";
      const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb"
      const utxos = await blockchainProvider.fetchAddressUTxOs(
      contractAddress,
      policyId + assetHex
      );
      const tx = new Transaction({ initiator: w })

    // withdraw function with error
    await tx.redeemValue({value: utxos[0], script: contract, datum: utxos[0]}) 
    
    
       
    const unsignedTx = await tx.build();
    const signedTx = await w.signTx(unsignedTx);
    const txHash = await w.submitTx(signedTx);

    console.log("txHash", txHash);

};



     // address is recipient address

//      {
//         address: contractAddress,
//         datum: {
//             value: userWalletKeyhash,
//             inline: true,
//         },
//     }, 
//     'TADA', 
//     '1'
// }

//    const unsignedTx = await tx.build();
//    const signedTx = await w.signTx(unsignedTx);
//    const txHash = await w.submitTx(signedTx);

//    console.log("txHash", txHash);

//    if (txHash) {
//      const koios = new KoiosProvider("preprod");
     
//      koios.onTxConfirmed(txHash, () => {
//        console.log("confirmed")
//      });
//     }

    //  let recipient =  {
    //     address: contractAddress,
    //             datum: {
    //                 value: userWalletKeyhash,
    //                 inline: true,
    //             }
    //  }
 
    // await tx.sendAssets(contractAddress, [{
    //     quantity: "1",
    //     unit: "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441",
    // }])





    // })
    //  const tx = new Transaction({ initiator: w })
    
    //  tx.sendValue(userAddressStr, manualUtxo)
    // //  .redeemValue({
    // //     value: utxos[0],
    // //     script: contract,
    // //     datum: '',
    // //  })


    // console.log()
















// Deposit logic that store the required users info
    // type PoolDataValues = {
    //     addr: string;
    //     deadline: number;
    //     poolType: number;
    // }
    
    // // change to database
    // let userDb: PoolDataValues[] = [];
    
    // const Deposit = function(wallet: BrowserWallet) {
    //     //  tx
    //     console.log(wallet)
    //     // After the transaction, store the mapping of a user's address to his pool values
    //     let poolData: PoolDataValues = {
    //         addr: '2',
    //         deadline: 0,
    //         poolType: 0
    //     };
    
    //     userDb.push(poolData);
    // };
    
    