import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMemoInstruction } from "@solana/spl-memo";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));
console.log(
  `Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey("2rW5brXaCLposug7R187capS6toNG5vx2QjGjhFEUQYk");
console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);
const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);
const memoText = "Hello from Solana!";
const addMemoInstruction = createMemoInstruction(memoText);
transaction.add(addMemoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`Transaction confirmed, signature: ${signature}!`);
console.log(`memo is ${memoText}...`);