import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const url = clusterApiUrl("devnet");
const connection = new Connection(url);

const user = getKeypairFromEnvironment("SECRET_KEY");


let balance = await connection.getBalance(user.publicKey);
console.log("💰 User balance:", balance / 1e9, "SOL");

if (balance < 0.01 * 1e9) {
  console.log("⚡ Requesting airdrop...");
  const sig = await connection.requestAirdrop(user.publicKey, 2 * 1e9);
  await connection.confirmTransaction(sig, "confirmed");
  console.log("✅ Airdrop complete");

  balance = await connection.getBalance(user.publicKey);
  console.log("💰 New balance:", balance / 1e9, "SOL");
}


const tokenMint = new PublicKey("GV96phrk756ZV3kLXhXRf5DksAexoRcNzp5HRUnx7AN8");
const recipient = new PublicKey("D2TGc9e5iUpBCvVbxuLW2aFSa9uJd1vKsdTYpEDAL7oZ");

try {
  const recipientATA = await getOrCreateAssociatedTokenAccount(
    connection,
    user,       
    tokenMint, 
    recipient   
  );

  console.log(
    `✅ For mint ${tokenMint.toBase58()} for owner ${recipient.toBase58()} the ATA is: ${recipientATA.address.toBase58()}`
  );

  const link = getExplorerLink(
    "address",
    recipientATA.address.toBase58(),
    "devnet"
  );
  console.log(`🔗 Explorer: ${link}`);

} catch (err) {
  console.error("❌ Error:", err);
}
