import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://si3.bcentral.cl/indicadoressiete/secure/IndicadoresDiarios.aspx';
const AxiosInstance = axios.create();


function getUF() {
    AxiosInstance.get(url)
        .then(
            response => {
                const html = response.data;
                const uf = scrapUFValue(html);
                console.log(uf);
            }
        )
        .catch(console.error);
}

function scrapUFValue(html: string): number {
    const $ = cheerio.load(html);
    const uf = $('#lblValor1_1').text();
    return ConvertToNumber(uf);
}

function ConvertToNumber(input: string) {
    const output = input.replace('.', '').replace(/,/g, '.');
    return parseFloat(output);
}

getUF();