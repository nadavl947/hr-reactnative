import Company from "../models/companyModel";

export const COMPANY = [
  new Company(
    1,
    "Codex Systems Ltd.",
    "https://media-exp1.licdn.com/dms/image/C4D0BAQHQXss8T9N14g/company-logo_200_200/0?e=1596067200&v=beta&t=r3XjlyusiLhDFYtfdsWax1LEgYPWwJYEYfidepmz3j8",
    "#4bb0dd",
    "Israel's leading legal recruitment company. Founded in 1999 and specializes in recruitment for legal, para-legal and administration positions, Codex is much more than an ordinary recruitment company;  with its cutting-edge technology, long years of experience and super-strong team of passionate and professional career consultants, Codex is the place for you to find the perfect match. Whether you are an employee, looking for your next career challenge, or an employer looking for a strategic merger or simply to strengthen your team with the right candidate(s). Proudly serving the entire legal industry in Israel for over 17 years (from law firms, through public sector to corporate sector) Codex is renowned for its accurate placements and non-compromising excellent service provided to its clients. At Codex, we don't hit Fwd on CV's. We create long-lasting relationships.",
    [
      {
        name: "Candidates",
        id: 1,
      },
      {
        name: "Law Forum",
        id: 2,
      },
      {
        name: "R&D",
        id: 3,
      },
      {
        name: "HR",
        id: 4,
      },
      {
        name: "Marketing",
        id: 5,
      },
      {
        name: "Administration",
        id: 6,
      },
    ],
    1999,
    {
      street: "Harechev",
      number: "4",
      city: "Tel Aviv",
      geo: {
        lat: "32.062950",
        lng: "34.785760",
      },
    },
    [
      {
        id: 1,
        name: "user",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 3,
        name: "hr",
      },
    ]
  ),
  new Company(
    2,
    "MyHeritage",
    "https://media-exp1.licdn.com/dms/image/C4D0BAQG-sHHYLNw6Sg/company-logo_200_200/0?e=1596672000&v=beta&t=q8fL-gxY5ICOls6IVkz-xCW7Hj9hQw4ghWK8VeZI9ts",
    "#D2691E",
    "MyHeritage is the leading global discovery platform for exploring family history, uncovering ethnic origins, finding new relatives, and gaining valuable health insights. With sophisticated matching technologies and billions of international historical records, MyHeritage empowers users to build their family trees and make exciting family connections. As the world’s only integrated service that combines family history and DNA testing for genealogy and health, MyHeritage is uniquely positioned to offer users a meaningful discovery experience that unites their past, present, and future.",
    [
      {
        name: "Labs",
        id: 1,
      },
      {
        name: "Clinics",
        id: 2,
      },
      {
        name: "R&D",
        id: 3,
      },
      {
        name: "HR",
        id: 4,
      },
      {
        name: "Marketing",
        id: 5,
      },
      {
        name: "Administration",
        id: 6,
      },
    ],
    2003,
    {
      street: "Hapardes",
      number: "76",
      city: "Or Yehuda",
      geo: {
        lat: "32.062950",
        lng: "34.785760",
      },
    },
    [
      {
        id: 1,
        name: "user",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 3,
        name: "hr",
      },
    ]
  ),
];
