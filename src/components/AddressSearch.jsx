import { useState } from "react";
import axios from "axios";

const AddressSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const searchAddress = async () => {
        const confmKey = "devU01TX0FVVEgyMDI0MDcyMzE0NTkzMjExNDk1MjE=";
        const currentPage = 1;
        const countPerPage = 10;
        const resultType = "json";

        const apiUrl = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${confmKey}&currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(keyword)}&resultType=${resultType}`;

        try {
            const response = await axios.get(apiUrl);
            console.log(response.data); // API 응답 데이터 구조 확인
            const { errorMessage, totalCount } = response.data.results.common;

            if (errorMessage === "정상" && totalCount > 0) {
                setResults(response.data.results.juso);
                setError(null);
            } else {
                setError("검색 결과가 없습니다.");
                setResults([]);
            }
        } catch (error) {
            console.error("Error: ", error);
            setError("API 호출 중 오류가 발생했습니다.");
            setResults([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchAddress();
    };

    return (
        <div>
            <h1>도로명주소 검색</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="도로명주소를 입력하세요"
                    required
                />
                <button type="submit">검색</button>
            </form>
            <div>
                {error && <p>{error}</p>}
                {results.length > 0 ? (
                    results.map((juso, index) => (
                        <div key={index}>
                            <p>{`${juso.roadAddrPart1} ${juso.roadAddrPart2}`}</p>
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default AddressSearch;
