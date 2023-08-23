import { useEffect, useState } from 'react'
import styles from './detail.module.css'
import { useParams } from 'react-router-dom'

interface CoinProp {
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowprice: string;
    formatedHighprice: string;
    error?: string;
}

export function Detail() {
    const { cripto } = useParams();
    const [detail, setDetail] = useState<CoinProp>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=2e14b04842b2e11b&pref=BRL&symbol=${cripto}`)
                .then(response => response.json())
                .then((data: CoinProp) => {

                    const price = Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                    const resultData = {
                        ...data,
                        formatedPrice: price.format(Number(data.price)),
                        formatedMarket: price.format(Number(data.market_cap)),
                        formatedLowprice: price.format(Number(data.low_24h)),
                        formatedHighprice: price.format(Number(data.high_24h))
                    }


                    setDetail(resultData);
                    setLoading(false);

                })
        }

        getData();
    }, [cripto])

    if (loading) {
        return (
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando informações</h4>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.center}>
                {detail?.name}
            </h1>
            <p className={styles.center}>
                {detail?.symbol}
            </p>
        </div>
    )
}