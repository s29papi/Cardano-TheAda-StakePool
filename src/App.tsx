import React from 'react';

import { Stack, Button, Flex } from "@chakra-ui/react";
import {  useWallet} from '@meshsdk/react';
import ConnectionHandler from "./components/ConnectionHandler";

import { Deposit6, Deposit12, Deposit18, Withdraw} from "./Stake";


function App() {
    const {name} = useWallet()

    
  return (
    


    <div className="App">
    
      <Flex
        height="100vh"  // Set the height of the container to full viewport height
        align="center"  // Center items vertically
        justify="center" // Center items horizontally
      >
          
          <Stack spacing='42px' direction='column' align='center' >
              {/* Deposit 6 months */}
              <Button onClick={async () => {await Deposit6(name)}} colorScheme='teal' size='lg'>Deposit 6 months</Button>
              {/* Deposit 12 months */}
              <Button onClick={() => Deposit12(name)} colorScheme='teal' size='lg'>Deposit 12 months</Button>
              {/* Deposit 18 months */}
              <Button onClick={() => Deposit18(name)} colorScheme='teal' size='lg'>Deposit 18 months</Button>

              <Button onClick={() => Withdraw(name)} colorScheme='orange' size='lg'>Withdraw</Button>
              <Button onClick={() => shout()} colorScheme='blue' size='lg'>Check APR / APY</Button>

              
              <div >
                    <ConnectionHandler />
                          {/* {
                              connected &&
                              <>
                              <Button onClick={onLock} >Lock 10 tADA</Button>
                              <Button onClick={onUnlock} >Unlock</Button>
                              </>
                          }  */}
              </div>
           
          </Stack>
      </Flex>
      
    </div>
    
  );
}




export default App;

function shout() {
  console.log("APY, APR")
}

