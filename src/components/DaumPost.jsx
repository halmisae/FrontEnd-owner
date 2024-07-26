import React from 'react';
import style from "../scss/DaumPost.css";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Button from "react-bootstrap/Button";

const DaumPost = ({ setAddress }) => {
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        let localAddress = data.sido + ' ' + data.sigungu;

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress = fullAddress.replace(localAddress, '');
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(localAddress + fullAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return <Button className={style.find_address_button} variant={"outline-secondary"} size={"sm"} onClick={handleClick}>주소검색</Button>;
};

export default DaumPost;