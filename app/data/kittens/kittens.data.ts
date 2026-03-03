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
    image: "https://sun9-39.userapi.com/s/v1/ig2/rLQ4ZEyUl-84oU6aI5V56aClsZ-6NQmgwizn0t923a8otzQCH5Sm2GPwiNhNdMYdEy9VTAcv2aD9eDvwkQC7TYsH.jpg?quality=95&as=32x20,48x30,72x45,108x67,160x99,240x149,360x223,480x297,540x334,640x396,720x446,1080x669,1280x793,1440x892,2201x1363&from=bu&u=icB2RJv3RwBgdPvJDeSSQvHFZBzUWqCnaDj-ppM6vps&cs=540x0",
    name: "Onara (Largeminion Onara)",
    description: "Голубая девочка. Можно интересоваться!",
    litter: "L1",
    age: "4 месяца",
    gender: "Девочка",
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


