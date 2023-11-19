import 'reflect-metadata'
import {container} from "@Container";
import {IInitiator} from "@Core/Types";
import {CoreSymbols} from "@CoreSymbols";

export default async function Home() {

  try {
    await container.get<IInitiator>(CoreSymbols.Initiator).start()
  } catch (e) {
    await container.get<IInitiator>(CoreSymbols.Initiator).stop()
  }

  return (
      <h1>Консольна</h1>
  )
}
