// data.js
const output_json = {
    "id": 19,
    "patient_id": "7",
    "wsi_video_url": "None",
    "inference_results": "{'delayTime': 950, 'executionTime': 7223, 'id': 'sync-e1323ad4-a299-4159-9342-1fa220a3c2b5-e1', 'output': {'detection_results': [[121, 4, 163, 45, 'Circular_RBC'], [396, 312, 433, 353, 'Circular_RBC']], 'status': 'COMPLETED', 'workerId': 'vgfqxs1imv8aym'}",
    "celery_status": "completed",
    "filename": "7_20241209_024613.png",
    "sample_type": "blood",
    "date": "2024-12-09"
  };
  
  const parseDetectionResults = () => {
    try {
      let jsonString = output_json.inference_results
        .replace(/\/\*[\s\S]*?\*\//g, '') 
        .replace(/'/g, '"'); 

      const inferenceResults = JSON.parse(jsonString);
      return inferenceResults.output.detection_results;
    } catch (error) {
      console.error("Error parsing detection results:", error);
      return [];
    }
  };
  
  export const detection_results = parseDetectionResults();
  export const patient_info = {
    id: output_json.patient_id,
    sample_type: output_json.sample_type,
    date: output_json.date,
    filename: output_json.filename
  };
