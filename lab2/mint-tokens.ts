import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");


const tokenMintAccount = new PublicKey(
  "GV96phrk756ZV3kLXhXRf5DksAexoRcNzp5HRUnx7AN8"
);


const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,                  
  tokenMintAccount,      
  user.publicKey         
);


const transactionSignature = await mintTo(
  connection,
  user,                                 
  tokenMintAccount,                      
  recipientAssociatedTokenAccount.address, 
  user,                                 
  10 * MINOR_UNITS_PER_MAJOR_UNITS       
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");
console.log(`✅ Success! Mint Token Transaction: ${link}`);
