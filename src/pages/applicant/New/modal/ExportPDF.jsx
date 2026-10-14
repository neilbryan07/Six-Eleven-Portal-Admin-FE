import React, { useRef, lazy, Suspense, useState, useEffect } from "react";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';


import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { useNavigate, useParams } from "react-router-dom";

import { pageRoutes } from "../../../../routes/pageRoutes";
import { APIServices } from "../../../../contants/apiConfig";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { niceNum } from "chart.js/helpers";

const ExportPDF = () => {

    const { id } = useParams();
    const contentRef = useRef();

    const [videoContent, setvideoContent] = useState(null);
    const [userScore, setUserScore] = useState(null);
    const [personalityExam, setPersonalityExam] = useState(null);
    const [assessmentExam, setAssessmentExam] = useState(null);


    useEffect(() => {
        handleVideoResult();
        handlePreExamType();
        handlePersonalityResult();
        handleAssessmentExam();
    }, []);


    const handlePreExamType = async () => {

        const response = await APIServices.get({
            url: `informal/user-answers/${id}`
        });

        if (response.status === 200) {
            setUserScore(response?.data)
        }
    }

    const handleVideoResult = async () => {

        const response = await APIServices.get({
            url: `video-assessment/user-answers?user_id=${id}`
        });

        if (response.status === 200) {
            setvideoContent(response?.data)
        }
    }

    const handlePersonalityResult = async () => {

        const response = await APIServices.get({
            url: `person-exam/fetch-all?user_id=${id}`
        });

        if (response.status === 200) {
            setPersonalityExam(response?.data?.data)
        }
    }


    const handleAssessmentExam = async () => {

        const response = await APIServices.get({
            url: `scoring/${id}`
        });

        if (response.status === 200) {
            setAssessmentExam(response?.data)
        }
    }

    const handleExportPDF = async () => {
        const input = contentRef.current;

        // Capture the entire scrollable area
        const canvas = await html2canvas(input, {
            scale: 1.2, // Higher quality render
            useCORS: true,
            scrollY: -window.scrollY,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;
        let pageNumber = 1;

        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);
        heightLeft -= pageHeight;

        // Handle multiple pages
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

            // Add footer page number
            pageNumber++;
            pdf.setFontSize(10);
            pdf.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);

            heightLeft -= pageHeight;
        }

        // ✅ Generate today's date in "Nov.1.2025" format
        const today = new Date();
        const options = { month: "short" }; // gives "Nov"
        const month = today.toLocaleString("en-US", options);
        const formattedDate = `${month}.${today.getDate()}.${today.getFullYear()}`;

        pdf.save(`${assessmentExam?.user?.full_name}_(${formattedDate}).pdf`);
    };

    const handleScoringType = (data) => {

        let direct = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        let reverse = ['', 'Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

        if (parseInt(data?.question?.scoring_type) === 1) {
            return <h1 className='text-sm text-black'>{data?.user_score_awarded} ( {direct[data?.user_score_awarded]} )</h1>
        }
        else {
            return <h1 className='text-sm text-black'>{data?.user_score_awarded} ( {reverse[data?.user_score_awarded]} )</h1>
        }

    }

    return (
        <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-2">

            <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2">

                <div className="flex flex-row gap-2 items-center">
                    <h1 className="text-sm text-[#556fa8] font-medium">
                        Export Exam Result
                    </h1>
                </div>

                <button
                    onClick={handleExportPDF}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <PictureAsPdfIcon /> Export to PDF
                </button>
            </div>

            <div ref={contentRef} className="p-6 bg-white rounded-xl shadow-lg">

                <div className="w-full flex flex-col">
                    <h1 className="text-2xl font-bold mb-4 text-black">{assessmentExam?.user?.last_name} , {assessmentExam?.user?.first_name} {assessmentExam?.user?.middle_name}</h1>
                    <div className="w-full flex flex-col gap-2">

                        <div className="w-full flex flex-row items-center">
                            <div className="flex flex-row gap-2 items-center justify-start w-1/3">
                                <p>Email : {assessmentExam?.user?.email}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">

                                <p>Contact No. : {assessmentExam?.user?.contact_number}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p >Civil Status : {assessmentExam?.user?.civil_status}</p>
                            </div>
                        </div>

                        <div className="w-full flex flex-row items-center">
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p >Current Address : {assessmentExam?.user?.current_address}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">

                                <p>Permanent Address : {assessmentExam?.user?.permanent_address}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p>Branch Site : {assessmentExam?.branch?.name}</p>
                            </div>

                        </div>

                        <div className="w-full flex flex-row items-center">
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p>Birthday  : {assessmentExam?.user?.birthday}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p>Age  : {assessmentExam?.user?.age}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center w-1/3">
                                <p>Gender : {assessmentExam?.user?.gender}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full flex flex-col border-t-2 p-4 my-2">


                    <h1 className="text-xl text-black font-medium mb-2 text-center">
                        Pre Exam Result
                    </h1>

                    <table className="border border-gray-300 w-full text-left mt-2" >

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-black">Multiple Choices Question</th>
                                <th className="p-2 border text-black text-center">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userScore?.choice_answers?.map((row, index) => (
                                <tr>
                                    <td className="p-2 border text-black w-1/2">{index + 1}. {row?.question?.question}</td>
                                    <td className="p-2 border text-black w-1/2 text-center">{row?.choice?.choice}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <table className="border border-gray-300 w-full text-left mt-4" >

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-black">Provided Answer Question</th>
                                <th className="p-2 border text-black text-center">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userScore?.fill_answers?.map((row, index) => (
                                <tr>
                                    <td className="p-2 border text-black w-1/2">{index + 1}. {row?.question?.question}</td>
                                    <td className="p-2 border text-black w-1/2 text-center">{row?.fill_answer}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


                <div className="w-full flex flex-col border-t-2 p-4 my-2">


                    <h1 className="text-xl text-black font-medium  mb-2 text-center">
                        Assessment Result | Total Score  ({assessmentExam?.final_suitability_score} )
                    </h1>

                    <table className="border border-gray-300 w-full text-left mt-2" >

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-black">Type</th>
                                <th className="p-2 border text-black text-center"> Raw Score | Max Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessmentExam?.scores?.map((row, index) => (
                                <tr key={index}>
                                    <td className="p-2 border text-black w-1/2">{index + 1}. {row?.exam_name}</td>
                                    <td className="p-2 border text-black w-1/2 text-center">{row?.raw_score} | {row?.max_score}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


                <div className="w-full flex flex-col border-t-2 p-4 my-2">


                    <h1 className="text-xl text-black font-medium  mb-2 text-center">
                        Personality Exam Result
                    </h1>

                    {personalityExam?.map((row, index) => (

                        <table key={index} className="border border-gray-300 w-full text-left  mt-4" >

                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border text-black">{row?.exam_title}</th>
                                    <th className="p-2 border text-black text-center">Score Awarded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {row?.responses?.map((rowData, indexData) => (
                                    <tr key={indexData}>
                                        <td className="p-2 border text-black w-1/2">{indexData + 1}. {rowData?.question?.question_name}</td>
                                        <td className="p-2 border text-black w-1/2 text-center">{handleScoringType(rowData)}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    ))}

                </div>


                <div className="w-full flex flex-col border-t-2 p-4 mt-10">


                    <h1 className="text-xl text-black font-medium mb-2 text-center mt-[150px]">
                        One Way Interview Result
                    </h1>

                    <table className="border border-gray-300 w-full text-left mt-2" >

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-black">Question</th>
                                <th className="p-2 border text-black text-center">Remarks | Ratings</th>
                            </tr>
                        </thead>
                        <tbody>

                            {videoContent?.questions?.map((row, index) => (
                                <tr>
                                    <td className="p-2 border text-black w-1/2">{index + 1}. {row?.question_text}</td>
                                    <td className="p-2 border text-black w-1/2 text-center">
                                        <div className="flex flex-col gap-2 justify-center w-full items-center">
                                            <div className="flex flex-row items-center gap-2 mt-2">
                                                <div className="flex flex-row items-center">
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={row?.answer?.score?.rating}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 justify-center w-full items-center">
                                                <p>Remarks : ( {row?.answer?.score?.scored_by?.name} )</p>
                                                <p>{row?.answer?.score?.feedback}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                    <h1 className="text-xl text-black font-medium mb-2 text-center mt-10">
                        One Way Interview Overall Remarks
                    </h1>

                    <table className="border border-gray-300 w-full text-left mt-2" >

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-black">Question</th>
                                <th className="p-2 border text-black text-center">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoContent?.overall_remarks?.map((row, index) => (
                                <tr className="w-full">
                                    <td className="p-2 border text-black w-1/2">{index + 1}. {row?.created_by_name}</td>
                                    <td className="p-2 border text-black w-1/2 text-center">
                                        {row?.remarks}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default ExportPDF;
