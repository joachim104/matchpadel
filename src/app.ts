import express, { Application, Request, Response } from 'express'

const axios = require('axios').default;

const app: Application = express()

const port: number = 3000

app.get('/', async (req: Request, res: Response) => {

    const text = await getDocument();

    if(!text) return res.send('an error occured while fetching document')

    const padelOccurences = countOccurencesInString(text)
    
    return res.send({ result: padelOccurences});
})

app.listen(port, function () {
    console.log(`App is listening on port ${port}`)
})


async function getDocument(): Promise<string | undefined> {
    try { 
      const response = await axios.get('https://matchpadel.halbooking.dk/newlook/proc_liste.asp', {responseType: 'document'});
      const data: string = response.data

      return data;
    } catch (error) {
      console.error(error);
    }
}

function countOccurencesInString(text: string): number {
    const count: number = (text.match(/padel/g) || []).length;
    return count
}
 