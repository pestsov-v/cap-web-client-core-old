import 'reflect-metadata'
import {container} from "@Container";
import {IInitiator} from "@Core/Types";
import {CoreSymbols} from "@CoreSymbols";
import axios from "axios";

export default async function Home() {

  try {
    // await container.get<IInitiator>(CoreSymbols.Initiator).start()

    const headers = new axios.AxiosHeaders()
    headers.set('x-service-name', 'SysAdmin')
    headers.set('x-domain-name', 'SysAuth')
    headers.set('x-action-name', 'v1/login')


    await axios.post('http://localhost:11033/v1/call/api/', {}, {
      headers: headers
    })


  } catch (e) {
    throw e
  }



  return (
      <h1></h1>
  )
}
