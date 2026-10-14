import React, { lazy, Suspense, useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import { APIServices } from '../../../../contants/apiConfig';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';


const GuidesFormula = ( {open , handleCloseGuide} ) => {

    const handleClose = () => {
       handleCloseGuide();
    }

  return (
<Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >

      <div className='max-w-[600px] max-h-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Formula Guides</h1>

          <div oclassName='flex flex-col items-center' onClick={ handleClose }>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-3 max-h-[500px] overscroll-y-auto overflow-y-auto '>

            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>General Scoring Guide</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-semibold'>• Low Response (Incorrect or Unhelpful Answer) → 1 point</span>
                        <span className='text-sm text-black font-semibold'>• Neutral Response (Partially Correct but Not Ideal Answer) → 3 points</span>
                        <span className='text-sm text-black font-semibold'>• Ideal Response (Best Possible Answer) → 5 points</span>
                        <span className='text-sm text-black font-semibold'>• Total Possible Score for MCQs Exam: 15 Points</span>
                    </div>

                </AccordionDetails>

            </Accordion>

            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>Verbal Exam Manual Scoring Guide</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-semibold'>• Low: 1-2 (Hard to understand, monotone, frequent mispronunciations)</span>
                        <span className='text-sm text-black font-semibold'>• Neutral: 3 (Some errors, but mostly understandable)</span>
                        <span className='text-sm text-black font-semibold'>• Ideal: 4-5 (Clear, professional tone, natural delivery)</span>
                    </div>

                </AccordionDetails>

            </Accordion>

            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>Mock / Live Exam Manual Scoring Guide</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-semibold'>• Low (1-2): Dismissive, unhelpful, no clear resolution</span>
                        <span className='text-sm text-black font-semibold'>• Neutral (3): Provides a resolution but lacks empathy or clarity</span>
                        <span className='text-sm text-black font-semibold'>• Ideal (4-5): Professional, empathetic, resolves effectively</span>
                    </div>

                </AccordionDetails>

            </Accordion>

            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>Formula for Typing Speed & Accuracy</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-normal'>1. Speed Score (Words Typed Per Minute - WPM):</span>

                        <div className='ml-5 flex flex-col gap-2'>
                            <span className='text-sm text-black font-semibold'>• Below 30 WPM → Low (1-2 points)</span>
                            <span className='text-sm text-black font-semibold'>• 30-40 WPM → Neutral (3 points)</span>
                            <span className='text-sm text-black font-semibold'>• Above 40 WPM → Ideal (4-5 points)</span>
                        </div>

                        <span className='text-sm text-black font-normal'>2. Accuracy Score (% of Correctly Typed Words):</span>

                        <div className='ml-5 flex flex-col gap-2'>
                            <span className='text-sm text-black font-semibold'>• 90-100% accuracy → Ideal (4-5 points)</span>
                            <span className='text-sm text-black font-semibold'>• 80-89% accuracy → Neutral (3 points)</span>
                            <span className='text-sm text-black font-semibold'>• Below 80% accuracy → Low (1-2 points)</span>
                        </div>

                        <span className='text-sm text-black font-normal'>Final Score Calculation:</span>
                        <span className='text-sm text-black font-semibold'>(Speed Score + Accuracy Score) ÷ 2 = Final Typing Score</span>

                    </div>

                </AccordionDetails>

            </Accordion>
            
            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>Weighted Score Calculation</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-semibold'>• Raw Score ÷ 15 × 5% (0.05 weight value)</span>
                        <span className='text-sm text-black font-semibold'>• The weighted score contributes to the final 1-10 suitability rating.</span>
                        <span className='text-sm text-black font-semibold'>• Total Weighted Score = Sum of all weighted scores</span>
                    </div>

                </AccordionDetails>

            </Accordion>

                        
            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className='text-sm text-green-700 font-bold'>Example Formula</span>
                </AccordionSummary>

                <AccordionDetails>
                    
                    <div className='w-full flex flex-col gap-2'>
                        <span className='text-sm text-black font-semibold'>Final Suitability Score Calculation (1-10 Scale)</span>
                        <span className='text-sm text-black font-semibold'>Final Suitability Score = (Total Weighted Score) × 10</span>
                        <span className='text-sm text-black font-semibold'>Example:</span>

                        <div className='flex flex-col ml-5 gap-2'>
                            <span className='text-sm text-black font-semibold'>• If a candidate scores 75% of the maximum raw score, the final suitability score would be 7.5/10.</span>
                            <span className='text-sm text-black font-semibold'>• If a candidate performs exceptionally well and gets 90%, their suitability score would be 9.0/10.</span>
                        </div>
                    </div>

                </AccordionDetails>

            </Accordion>

        </div>

      </div>

    </Backdrop>
  )
}

export default GuidesFormula
