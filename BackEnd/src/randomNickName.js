import nickNameData from '../nickNameData.json'

const randomNickName = () => {
  const nickNameDataDeterminers = nickNameData.determiners
  const nickNameDataAnimals = nickNameData.animals
  const randomNum = (num) => {
    return Math.floor(Math.random()*num)
  }
  return nickNameDataDeterminers[randomNum(nickNameDataDeterminers.length)] + nickNameDataAnimals[randomNum(nickNameDataAnimals.length)]
}

export default randomNickName
