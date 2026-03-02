import { IPet } from "@/types/type.data.pets";

type parents = {
    id: number;
    name: string;
    image: string;
  };

interface IKitten {
  id: number;
  name: string;
  image: string;
  description: string;
  litter: string;
  age: string;
  gender: string;
  mother: parents;
  father: parents;
}

export const kittensData: IKitten[] = [
  {
    id: 1,
    image: "https://sun9-52.userapi.com/s/v1/ig2/h6hp7wbwwy6HXMnIqmXsVOrPuEpDiwm0B3fs5KVkakU1ZEoheV6A0HOFmSmqFDpwsVibFWEZ0TsbuSKjT15vFkND.jpg?quality=95&as=32x28,48x42,72x63,108x95,160x141,240x211,360x317,480x423,540x476,640x564,720x634,1080x952,1280x1128,1440x1269,1960x1727&from=bu&u=xQzYC5kKF9NyfjbhOPqlU4d7-4LUKRc2ZyWmoYrXXow&cs=640x0",
    name: "Лемми (Largeminion Lemmy)",
    description: "Очаровательный малыш породы британская короткошерстная, голубого окраса. Возраст 2,5 месяца. Лемми отличается спокойным и уравновешенным характером, уже приучен к лотку и когтеточке. Очень ласковый и контактный мальчик, который станет прекрасным другом для всей семьи. На данный момент зарезервирован.",
    litter: "L1",
    age: "2,5 месяца",
    gender: "Мальчик",
    mother: {
      id: 1,
      name: "Ирма (Largeminion Irka)",
      image: "https://sun9-45.userapi.com/s/v1/ig2/IXW9PJMef-x9TSBVpBd4N_Ki8UHX7LUhlbuhGi4UKHmP2o1UPamqcuj69BXIdJ6ytgI_ZqiYAvUktZwX5ykZ4U07.jpg?quality=95&as=32x41,48x61,72x91,108x137,160x203,240x305,360x458,480x610,540x686,640x813,720x915,1078x1370&from=bu&u=o_4d8nWkkkdUFLThlafCd0ks7Nsqa1ucz1Z0lLPIBBU&cs=1078x0"
    },
    father: {
      id: 1,
      name: "Симба",
      image: "https://sun9-46.userapi.com/s/v1/ig2/Ej2J0wvGDCgwIlnFVfcut6Zy78YE889nQH-DQI1a7eJm27i1qijjV5T28bu94Him-gj9E7ddS6btfc0MDc9Jnmgp.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,750x1000&from=bu&u=-w_TVvbOEFOSND9sjhrKjU29xWf3d34IxgLAxXN_j2w&cs=640x0"
    }
  }
];


