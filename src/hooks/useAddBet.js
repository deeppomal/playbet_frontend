import { useQuery } from 'react-query'
import axios from 'axios'

const fetchAddBet = (data)=>{
    const options = {
        method: 'POST',
        url: 'https://playbet-backend-ptwt.onrender.com/bet/add-bet',
        data: {
            userId: data.userId,
            fixtureId: data.fixtureId,
            home: data.home,
            away: data.away,
            betAmount: data.betAmount,
            expectedReturn: data.expectedReturn,
            selectedTeam:data.selectedTeam,
            hasWon: data.hasWon,
            amountWon: data.amountWon,
            oddsDetail: data.oddsDetail,
            isResultChecked: data.isResultChecked,
        },
    };
    return axios.request(options)
}
export const useAddBet = (data) => {
    return useQuery(
        'addbet-'+data?.fixtureId,
        ()=>fetchAddBet(data),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity,
            enabled:false
        }
    )
}