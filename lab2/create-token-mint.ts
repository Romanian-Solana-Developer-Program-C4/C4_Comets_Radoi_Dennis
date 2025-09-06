import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const user = getKeypairFromEnvironment("SECRET_KEY");

  const tokenMint = await createMint(
    connection,         
    user,               
    user.publicKey,     
    null,               
    2                  
  );

  const link = getExplorerLink("address", tokenMint.toString(), "devnet");

  console.log(`✅ Token Mint: ${link}`);
}

main().catch((err) => {
  console.error("❌ Error creating mint:", err);
});
