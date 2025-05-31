import { Link } from "react-router-dom";

const newsData = [
    {
        image: "https://www.dejibattery.com/uploadfile/2025/05/24/20250524170539ofPE1y.jpg", // Replace with actual image URLs
        title:
            "Evolution of iPhone battery capacity: from the first generation to the iPhone 16 series",
        desc:
            "In this issue, DEJI battery systematically compares the battery capacity of iPho...",
    },
    {
        image: "https://www.dejibattery.com/uploadfile/2025/05/20/20250520150625mcK8Q5.png",
        title:
            "Unlock the Full Potential of Your iPhone Battery with Deji's Decode Battery Solutions",
        desc:
            "Are you tired of annoying battery warnings on your iPhone? Want to keep your dev...",
    },
    {
        image: "https://www.dejibattery.com/uploadfile/2025/04/24/20250424113859aAFxtw.jpg",
        title:
            "DEJI iPhone Replacement Batteries – Redefining Performance, Safety, and Compatibility",
        desc:
            "Upgrade your iPhone with DEJI’s high-quality replacement batteries. Featuring fu...",
    },
];

export default function News() {
    return (
        <div>
            <h2 className="text-2xl font-bold">NEWS</h2>
            <div className="max-w-4xl mx-auto rounded-xl px-4 py-6 bg-white">
                <div className="space-y-6">
                    {newsData.map((news, index) => (
                        <div key={index} className="lg:flex items-start space-x-4">
                            <img
                                src={news.image}
                                alt="News"
                                className="lg:w-[120px]  lg:h-[80px] object-cover rounded-sm"
                            />
                            <div>
                                <Link className="font-semibold text-black hover:text-green-600 leading-snug text-[15px]">
                                    {news.title}
                                </Link>
                                <p className="text-sm text-gray-600 mt-1">{news.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
