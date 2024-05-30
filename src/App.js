import axios from "axios";
import { useQuery } from "react-query";
import ProductCard from "./components/ProductCard";
import PrimarySearchAppBar from "./layout/header";
import Usage from "./swiper/caroucel";
import { Container, Grid } from "@mui/material";
import Footer from "./layout/footer";

function Home() {
  const { data, isLoading, isError } = useQuery("goods", async () => {
    const res = await axios.get("http://localhost:3001/goods");
    return res.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const likedGoods = data.filter((good) => good.status === true);
  const saleGoods = data.filter((good) => good.isBlackFriday);

  const sortedGoods = [...likedGoods, ...saleGoods];

  const slicedGoods = sortedGoods.slice(0, 15);

  const Armchairs = data.filter((good) => good.type === "furniture");
  const PC = data.filter((good) => good.type === "PC");
  const TV = data.filter((good) => good.type === "TV");
  const Audio = data.filter((good) => good.type === "audio");
  const Kitchen = data.filter((good) => good.type === "kitchen");

  const sections = [
    { slider: "", type: "Armchairs", arr: Armchairs },
    { slider: "", type: "PC", arr: PC },
    { slider: "", type: "TV", arr: TV },
    { slider: "", type: "Audio", arr: Audio },
    { slider: "", type: "Kitchen", arr: Kitchen },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <PrimarySearchAppBar />
        <ul id="links" className="flex gap-4" style={{ marginTop: '16px' }}>
        <li className="flex items-center"> {/* Add flex and items-center classes */}
          <img className="w-5 h-5" src="https://static.uzum.uz/nasiya/union.png" alt="" />
          <a className="ml-1" href="">Muddatli tolov</a>
        </li>
        <li className="flex items-center"> {/* Add flex and items-center classes */}
          <img className="w-5 h-5 ml-8" src="https://static.uzum.uz/fast_categories/new_sale_2023.png" alt="" />
          <a className="ml-1" href="">Sirli toplam</a>
        </li>
        <li className="flex items-center"> {/* Add flex and items-center classes */}
          <img className="w-5 h-5 ml-8" src="https://static.uzum.uz/fast_categories/mens_gifts.png" alt="" />
          <a href="">Erkaklar uchun</a>
          <a className="ml-6 text-slate-400" href="">Elektronika</a>
          <a className="ml-6 text-slate-400" href="">Maishiy texnika</a>
          <a className="ml-6 text-slate-400" href=""> Kiyim</a>
          <a className="ml-6 text-slate-400" href="">Poyabzal</a>
          <a className="ml-6 text-slate-400" href="">Aksessuarlar</a>
          <a className="ml-6 text-slate-400" href="">Gozalik va parvarish</a>
          <a className="ml-6 text-slate-400" href="">Salomatlik</a>
          <a className="ml-6 text-slate-400" href="">Yana &gt;</a>
        </li>
      </ul>
        <Usage />
        <Grid container spacing={2} className="prods_div">
          {slicedGoods.map((good) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={good.id} style={{ flexBasis: '20%' }}>
              {/* Integrate style properties here */}
              <ProductCard good={good} style={{ display: "block", backgroundColor: "#fff", width: "100%", marginBottom: "3px", borderRadius: "3px" }} />
            </Grid>
          ))}
        </Grid>
        {sections.map((item, i) => (
          <section key={i} className="section_style">
            <div>
              <h1>
                <p>{item.type}</p>
              </h1>
              <Grid container spacing={2} className="prods_div">
                {item.arr.map((good) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={`${good.id}_${good.type}`} style={{ flexBasis: '20%' }}>
                    {/* Integrate style properties here */}
                    <ProductCard good={good} style={{ display: "block", backgroundColor: "#fff", width: "100%", marginBottom: "3px", borderRadius: "3px" }} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </section>
        ))}
        <Footer />
      </Container>
    </>
  );
}

export default Home;
