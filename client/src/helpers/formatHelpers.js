const currencyFormat = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'brl'})

export const formatValue = number => {
    return currencyFormat.format(number)
}