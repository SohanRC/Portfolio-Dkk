const mongoose = require('mongoose');
// const List = require("../models/publication.js");

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');

}


// const sampleListings = [
//   // Journal
//   {
//     author: "Sohom Roy, Soumik Ghosh, Chandan Giri, Dipak K Kole, Dhrubasish Sarkar",
//     title: "Mining the Human Networks and Identification of Group Activities Using the Crime Scraping Engine",
//     date: "18th July 2023",
//     description: "",
//     type: "Journal",
//     location: "International Journal of SN Computer Science, Vol.-4, Issue 5, Page No. 533",
//     link: "https://example.com"
//   },
//   {
//     author: "Tanmoy Chaku, Abhirup Ray, Malay Kule, Dipak Kumar Kole",
//     title: "X-ResFormer: A Model to Detect Infestation of Pest and Diseases on Crops",
//     date: "11th December 2022",
//     description: "Of late, convolutional neural networks have shown significant performance improvement over the traditional machine learning and dominate the classification tasks in the field of computer vision. Considering the success of CNNs in deep learning, and the utilization of self-attention mechanism, the vision transformers can better model the global contextual information as compared to CNNs, have seen rapid interest in vision community. In this paper, an attention-aided CNN and transformer model is proposed to identify pest and disease infestations of 14 crop species with 26 diseases (or absence thereof) on a public dataset of 54,309 images are collected under the controlled conditions. The proposed model achieves an accuracy of 94.24% in training and a test accuracy of 94.74% with a standard deviation of 3.66 on a fivefold cross-validation, which provides the better result as compared to the convolutional block attention module …",
//     type: "Journal",
//     location: "International Journal of SN Computer Science, Vol.-5, Issue 1, Page No. 86",
//     link: "https://scholar.google.co.in/citations?view_op=view_citation&hl=en&user=6nH28EAAAAAJ&sortby=pubdate&citation_for_view=6nH28EAAAAAJ:HbR8gkJAVGIC"
//   },
//   {
//     author: "D Mondal, K Roy, D Pal, D K Kole",
//     title: "Deep Learning-Based Approach to Detect and Classify Signs of Crop Leaf Diseases and Pest Damage",
//     date: "8th August 2022",
//     description: "",
//     type: "Journal",
//     location: "International Journal of SN Computer Science, Vol.-3, Issue 6, Page No. 433",
//     link: "https://example.com"
//   },
//   {
//     author: "J Mondal, D K Kole, H Rahaman, D K Das",
//     title: "DFT with Universal Test Set for All Missing Gate Faults in Reversible Circuits",
//     date: "22nd June 2022",
//     description: "",
//     type: "Journal",
//     location: "Journal of Circuits, Systems and Computers, Volume 31, Issue10",
//     link: "https://example.com"
//   },
//   {
//     author: "D Sarkar, S Roy, C Giri, Dipak Kumar Kole",
//     title: "A Statistical Model to Determine the Behavior Adoption in Different Timestamps on Online Social Network",
//     date: "October 2019",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Knowledge and Systems Science (IJKSS) 10 (4), 1-17",
//     link: "https://example.com"
//   },
//   {
//     author: "D Sarkar, S Debnath, Dipak K. Kole, P Jana",
//     title: "Influential Nodes Identification Based on Activity Behaviors and Network Structure With Personality Analysis in Egocentric Online Social Networks",
//     date: "October 2019",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Ambient Computing and Intelligence (IJACI) 10 (4), 1-24",
//     link: "https://example.com"
//   },
//   {
//     author: "Bappaditya Mondal, Chandan Bandyopadhyay, Dipak Kumar Kole, Debesh Kumar Das, Hafizur Rahaman",
//     title: "Test Generation from Boolean Generator for Detection of Missing Gate Faults (MGF) in Reversible Circuit Using Boolean Difference Method",
//     date: "July 2019",
//     description: "",
//     type: "Journal",
//     location: "IETE Journal of Research, 1-17",
//     link: "https://example.com"
//   },
//   {
//     author: "Joyati Mondal, Bappaditya Mondal, Dipak Kumar Kole, Hafizur Rahaman, Debesh Kumar Das",
//     title: "Boolean Difference Technique for Detecting All Missing Gate and Stuck-at Faults in Reversible Circuits",
//     date: "January 2019",
//     description: "",
//     type: "Journal",
//     location: "Journal of Circuits, Systems and Computers, (World Scientific Publishing Company)",
//     link: "https://example.com"
//   },
//   {
//     author: "Dhiman Mondal, Dipak K. Kole, and Kusal Roy",
//     title: "Gradation of yellow mosaic virus disease of okra and bitter gourd based on entropy based binning and Naive Bayes classifier after identification of leaves",
//     date: "November 2017",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computers and Electronics in Agriculture (Elsevier), Volume 142, Part B, Pages 485-493",
//     link: "https://example.com"
//   },
//   {
//     author: "Dhrubasish Sarkar, Dipak K Kole, Premananda Jana",
//     title: "Survey of influential nodes identification in online social networks",
//     date: "October 2016",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Virtual Communities and Social Networking (IJVCSN), Vol.-8 (4), 57-69",
//     link: "https://example.com"
//   },
//   {
//     author: "Diptesh Majumdar, Dipak K. Kole, Aruna Chakraborty, Dwijetsh Dutta Majumder",
//     title: "REVIEW: DETECTION & DIAGNOSIS OF PLANT LEAF DISEASE USING INTEGRATED IMAGE PROCESSING  APPROACH",
//     date: "June 2014",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computer Engineering and Applications (IJCEA), Volume VI, Issue-III, pp. 1-16",
//     link: "https://example.com"
//   },
//   {
//     author: "Dipak K. Kole, H. Rahaman, D. K. Das, and B. B. Bhattacharya",
//     title: "Derivation of test set for detecting multiple missing-gate faults in reversible circuits",
//     date: "February 2013",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computers and Electrical Engineering (Elsevier), 39(2):225-236",
//     link: "https://example.com"
//   },
//   {
//     author: "Pritam Das, Ranjit Ghoshal, Dipak K. Kole and R N Ghosh",
//     title: "Measurement of Displacement and Velocity of a Moving Object from Real Time Video",
//     date: "July 2012",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computer Applications, Volume39  – No.13, pp.12-16",
//     link: "https://example.com"
//   },
//   {
//     author: "Dipak K. Kole and Amiya Halder",
//     title: "Automatic Brain Tumor Detection and Isolation of Tumor Cells from MRI Images",
//     date: "February 2012",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computer Applications, Volume 39– No.16, pp. 26-30",
//     link: "https://example.com"
//   },
//   {
//     author: "H. Rahaman, Dipak K. Kole, D. K. Das, and B. B. Bhattacharya",
//     title: "Fault diagnosis in reversible circuits under missing-gate fault model",
//     date: "July 2011",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computers and Electrical Engineering (Elsevier), 37(4):475-485",
//     link: "https://example.com"
//   },
//   {
//     author: "Subarna Bhattacharjee, Dipak K. Kole and Amiya Halder",
//     title: "On-Line Image Compression Based on Pipelined Architecture",
//     date: "December 2010",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Computer Theory and Engineering (IJCTE), pp. 851-859",
//     link: "https://example.com"
//   },
//   {
//     author: "H. Rahaman, Dipak K. Kole, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "Detection of Bridging Faults in Reversible Circuits",
//     date: "October 2010",
//     description: "",
//     type: "Journal",
//     location: "The IUP Journal of Computer Sciences, Volume IV, No. 4, pp. 28-41",
//     link: "https://example.com"
//   },
//   {
//     author: "Dipak K. Kole and Amiya Halder",
//     title: "An Efficient Image Segmentation Algorithm using Dynamic GA based Clustering",
//     date: "January – June 2010",
//     description: "",
//     type: "Journal",
//     location: "International Journal of Logistics and Supply Chain Management, Volume 2, No. 1, pp. 17-20",
//     link: "https://example.com"
//   },

//   //Conference
//   {
//     author: "Tanmoy Chaku, Abhirup Ray, Malay Kule, Dipak Kumar Kole",
//     title: "Swift Sort: A New Divide and Conquer Approach Based Sorting Algorithm",
//     date: "29th September to 1st October 2021",
//     description: "Computational Intelligence for Machine Learning and Healthcare Informatics",
//     type: "Conference",
//     location: "the 2nd International Conference on Frontiers in Computing and Systems (COMSYS-2021)"
//   },
//   {
//     author: "S. Dutta, S. Roy, D. Sarkar, Dipak K. Kole",
//     title: "Application of Social Networks and Data Mining on Crime Victims",
//     date: "2021",
//     description: "Proceedings of the 2nd International Conference on Advanced Computing Applications (ICACA 2021), Advances in Intelligent Systems and Computing",
//     type: "Conference",
//     location: "Springer, Singapore"
//   },
//   {
//     author: "S. Dutta, D. Sarkar, S. Roy, Dipak K. Kole, P. Jana",
//     title: "A Study on Herd Behavior Using Sentiment Analysis in Online Social Network",
//     date: "16th - 18th June 2021",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Communication, Control and Information Sciences (ICCISc-2021), sponsored by TEQIP-II and technically co-sponsored by IEEE Kerala Section and IEEE Industry Applications Society (IAS), The Government Engineering College, Idukki, Kerala"
//   },
//   {
//     author: "Poulami Ghosh, Rilok Ghosh, Souptik Sinha, Ujan Mukhopadhyay, Dipak Kr. Kole, Aruna Chakroborty",
//     title: "A Novel Digital Watermarking Technique for Video Copyright Protection: An Advanced Study",
//     date: "10th May 2021",
//     description: "",
//     type: "Journal",
//     location: "Theory and Practice of Mathematics and Computer Science Vol. 10, Page 126-134"
//   },
//   {
//     author: "Anup Kumar Halder, Ayatullah Faruk Mollah, Piyali Chatterjee, Dipak Kumar Kole, Subhadip Basu, Dariusz Plewczynski",
//     title: "SeqPIP-2020: Sequence based Protein Interaction Prediction Contest",
//     date: "doi: https://doi.org/10.1101/2020.11.12.380774",
//     description: "",
//     type: "Journal",
//     location: "Published by Cold Spring Harbor Laboratory"
//   },
//   {
//     author: "SR Dasgupta, S Rakshit, D Mondal, Dipak K. Kole",
//     title: "Detection of Diseases in Potato Leaves Using Transfer Learning",
//     date: "2020",
//     description: "",
//     type: "Conference",
//     location: "Computational Intelligence in Pattern Recognition, pages: 675-684"
//   },
//   {
//     author: "Dhrubasish Sarkar, Medha Gupta, Premananda Jana, Dipak K Kole",
//     title: "Recommender system in healthcare: an overview",
//     date: "June 2020",
//     description: "",
//     type: "Conference",
//     location: "Computational Intelligence for Machine Learning and Healthcare Informatics, Pages: 199–216"
//   },
//   {
//     author: "Navoneel Chakrabarty, Tuhin Kundu, Sudipta Dandapat, Apurba Sarkar, Dipak Kumar Kole",
//     title: "Flight Arrival Delay Prediction using Gradient Boosting Classifier",
//     date: "2019",
//     description: "",
//     type: "Conference",
//     location: "INTERNATIONAL CONFERENCE ON EMERGING TECHNOLOGIES IN DATA MINING AND INFORMATION SECURITY (IEMIS), Book: Emerging Technologies in Data Mining and Information Security, pp. 651-659"
//   },
//   {
//     author: "S Bandyopadhyay, S Choudhury, SK Latib, Dipak K. Kole",
//     title: "Gradation of Diabetic Retinopathy using KNN Classifier by Morphological Segmentation of Retinal Vessels",
//     date: "2018",
//     description: "",
//     type: "Conference",
//     location: "International Proceedings on Advances in Soft Computing, Intelligent Systems and Applications, pp. 189-198"
//   },
//   {
//     author: "Dipak K. Kole, Hafizur Rahaman, Debesh Das, Somnath Rakshit, Sraboni Mondal",
//     title: "A Novel Reversible Synthesis of Array Multiplier",
//     date: "30-31st March 2018",
//     description: "",
//     type: "Conference",
//     location: "International Symposium on Devices, Circuits and Systems 2018"
//   },
//   {
//     author: "Somnath Rakshit, Sraboni Mondal, Aruna Chakraborty, Apurba Sarkar, Dipak K. Kole",
//     title: "Synthesis of Reversible Array Divider Circuit",
//     date: "Dec 16-17, 2017",
//     description: "",
//     type: "Conference",
//     location: "Third International Conference on ICT for Competitive Strategies 2017 (ICTCS 2017), Springer LNNS, pp.701 -707"
//   },
//   {
//     author: "Dhiman Mondal, and Dipak K. Kole",
//     title: "A Time Efficient Leaf Rust Disease Detection Technique of Wheat Images based on Ratio of Diseased Leaf Area (RDLA) and Rough Fuzzy C-Means",
//     date: "January 8-9, 2016",
//     description: "",
//     type: "Conference",
//     location: "3rd Third International Conference on Information System Design & System Applications (INDIA-2016), Springer AISC"
//   },
//   {
//     author: "S Choudhury, S Bandyopadhyay, SK Latib, Dipak K. Kole, C Giri",
//     title: "Fuzzy C means based feature extraction and classification of diabetic retinopathy using support vector machines",
//     date: "April 06-08, 2016",
//     description: "",
//     type: "Conference",
//     location: "IEEE International Conference on Communication and Signal Processing (ICCSP 2016), IEEE Xplore Digital Library"
//   },
//   {
//     author: "Dipak Kumar Kole, Jhuma Dutta, Arpita Kundu, Suravi Chatterjee, Suravi Agarwal, Tanushri Kisku",
//     title: "Generalized construction of quantum multiplexers and de-multiplexers using a proposed novel algorithm based on universal Fredkin gate",
//     date: "December 15-17, 2016",
//     description: "",
//     type: "Conference",
//     location: "International Symposium on Electronic System Design (ISED2016), IEEE Xplore Digital Library"
//   },
//   {
//     author: "Dhiman Mondal, Dipak K. Kole, Aruna Chakraborty, and Dwijetsh Dutta Majumder",
//     title: "Detection and Classification Technique of Yellow Vein Mosaic Virus Disease in Okra Leaf Images using Leaf Vein Extraction and Naive Bayesian Classifier",
//     date: "IEEE Explore, 8th -10th October, 2015",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Soft Computing Techniques & Implementations (ICSCTI-2015)"
//   },
//   {
//     author: "Joyati Mondal, Bappaditya Mondal, Dipak K. Kole, Hafizur Rahaman, Debesh K Das",
//     title: "Boolean Difference Technique for Detecting All Missing Gate Faults in Reversible Circuits",
//     date: "April 22-24, 2015",
//     description: "",
//     type: "Conference",
//     location: "IEEE 18th International Symposium on Design and Diagnostics of Electronic Circuits & Systems (DDECS 2015)"
//   },
//   {
//     author: "Samarpita Biswas, Nicole Belinda Dillen, Dipak K. Kole, Aruna Chakraborty",
//     title: "A Time Efficient Secret Image Sharing Scheme for Group Authentication System without Pixel Expansions",
//     date: "July 24 -26, 2015",
//     description: "",
//     type: "Conference",
//     location: "2nd International Conference on Computer and Communication Technologies (IC3T 2015), Springer AISC"
//   },
//   {
//     author: "Atanu Chakraborty, Debojoyti Mukherjee, Amit Dutta, Aruna Chakraborty, Dipak K. Kole",
//     title: "An Effective Stock Price Prediction Technique Using Hybrid Adaptive Neuro Fuzzy Inference System Based on Grid Partitioning",
//     date: "10th -13th August, 2015",
//     description: "",
//     type: "Conference",
//     location: "International Symposium on Intelligent Systems Technologies and Applications (ISTA’15), Springer"
//   },
//   {
//     author: "Diptesh Majumdar, Arya Ghosh, Dipak K. Kole, Aruna Chakraborty, Dwijetsh Dutta Majumder",
//     title: "An Integrated Digital Image Analysis System for Detection, Recognition and Diagnosis of Disease in Wheat Leaves",
//     date: "10th -13th August, 2015",
//     description: "",
//     type: "Conference",
//     location: "3rd Third International Symposium on Women in Computing and Informatics (WCI-2015), ACM Digital Library"
//   },
//   {
//     author: "Amit Dutta, Sudipta Paria, Tanmoy Golui, Dipak K. Kole",
//     title: "Structural Analysis and Regular Expressions based Noise Elimination from Web Pages for Web Content Mining",
//     date: "24th -27th September 2014",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Advances in Computing, Communications and Informatics (ICACCI-2014),IEEE Xplore Digital Library"
//   },
//   {
//     author: "Diptesh Majumdar, Arya Ghosh, Dipak K. Kole",
//     title: "Application of Fuzzy C-Means Clustering Method to Classify Wheat Leaf Images based on the presence of rust disease",
//     date: "14th -15th November 2014",
//     description: "",
//     type: "Conference",
//     location: "3rd International Conference on Frontiers of Intelligent Computing: Theory and applications (FICTA 2014), Springer AISC"
//   },
//   {
//     author: "Dhrubasish Sarkar, Dipak K. Kole, Premananda Jana, Aruna Chakraborty",
//     title: "Users Activity Measure in Online Social Networks using Association Rule Mining",
//     date: "172 – 178, Kolkata, India, 2014",
//     description: "",
//     type: "Conference",
//     location: "Proc. 1st International Science & Technology Congress (Elsevier Science & Technology ISBN 9789351072485)"
//   },
//   {
//     author: "Amit Dutta, Sudipta Paria, Tanmoy Golui, Dipak K. Kole",
//     title: "Noise Elimination from Web Page based on Regular Expressions for Web Content Mining",
//     date: "24th -26th  June 2014",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Advanced Computing, Networking and Informatics(ICACNI 2014), Springer Smart Innovation, Systems and Technologies Volume 27"
//   },
//   {
//     author: "Sk. Latib, Madhumita Mukherjee, Dipak K. Kole, Chandan Giri",
//     title: "Automatic Tortuosity Detection and Measurement of Retinal Blood Vessel Network",
//     date: "24th -26th  June 2014",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Advanced Computing, Networking and Informatics(ICACNI 2014), Springer Smart Innovation, Systems and Technologies Volume 27"
//   },
//   {
//     author: "Bappaditya Mondal, Dipak K. Kole, Debesh K. Das, Hafizur Rahaman",
//     title: "Generator for Test Set Construction of SMGF in Reversible Circuit by Boolean difference method",
//     date: "November 16-19, 2014",
//     description: "",
//     type: "Conference",
//     location: "23rd IEEE Asian Test Symposium 2014 (ATS 2014), IEEE Xplore Digital Library, at Hangzhou, China"
//   },
//   {
//     author: "Dipak K. Kole, Arya Ghosh, Soumya Mitra",
//     title: "Detection of Downy Mildew Disease present in the Grape Leaves based on Fuzzy Set theory",
//     date: "24th -26th  June 2014",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Advanced Computing, Networking and Informatics(ICACNI 2014), Springer Smart Innovation, Systems and Technologies Volume 27"
//   },
//   {
//     author: "Chandan Bandyopadhyay, Debashri Roy, Kamalika Dutta, Dipak K. Kole",
//     title: "ESOP-based Synthesis of Reversible Circuit Using Improved Cube list",
//     date: "December 12-13, 2013",
//     description: "",
//     type: "Conference",
//     location: "International Symposium on Electronic System Design (ISED 2013), IEEE Xplore Digital Library"
//   },
//   {
//     author: "Sneha Goswami, Dipak K. Kole, Aruna Chakroborty",
//     title: "DIGITAL WATERMARKING- A Review",
//     date: "13th- 15th, Dec 2013",
//     description: "",
//     type: "Conference",
//     location: "Proceedings of 48th Computer Society of India Annual Convention, 2013 (CIS-2013)"
//   },
//   {
//     author: "Amit Dutta, Dipak K. Kole",
//     title: "An Efficient Secret Image Sharing Scheme using an Effectual Position Exchange Technique",
//     date: "13th- 15th, pp. 227-234, Dec 2013",
//     description: "",
//     type: "Conference",
//     location: "48th Computer Society of India Annual Convention, 2013 (CIS-2013), Springer- LNCS conference proceedings"
//   },
//   {
//     author: "Arya Ghosh, Dipak K. Kole, Chandan Giri, Aruna Chakroborty",
//     title: "Detection and Measurement of Leaf Rust Disease in Wheat",
//     date: "December 05-07, 2013",
//     description: "",
//     type: "Conference",
//     location: "International Conference on Facets of Uncertainties and Application (ICFUA-2013)"
//   },
//   {
//     author: "Joyati Mondal, Debesh Kumar Das, Dipak K. Kole, Hafizur Rahaman",
//     title: "A Design for Testability Technique for Quantum Reversible Circuits",
//     date: "September 14-17, 2012",
//     description: "",
//     type: "Conference",
//     location: "Proc. of 10th EAST-WEST DESIGN & TEST SYMPOSIUM (EWDTS 2012)"
//   },
//   {
//     author: "Papiya Manna, Dipak K. Kole, Hafizur Rahaman, Debesh Kumar Das, Bhargab B. Bhattacharya",
//     title: "Reversible Logic Circuits Synthesis using Genetic Algorithm and Particle Swarm Optimization",
//     date: "December 19-22, 2012",
//     description: "",
//     type: "Conference",
//     location: "International Symposium on Electronic System Design (ISED 2012), IEEE Xplore Digital Library"
//   },
//   {
//     author: "Joyati Mondal, Debesh Kumar Das, Dipak K. Kole, Hafizur Rahaman, Bhargab B. Bhattacharya",
//     title: "On Designing Testable Reversible Circuits Using Gate Duplication",
//     date: "July 27-30, 2013",
//     description: "",
//     type: "Conference",
//     location: "17th International Symposium on VLSI Design and Test, VDAT2013"
//   },
//   {
//     author: "Sanjana Sinha, Swarnali Pramanick, Ankul Jagatramka, Prajnat Bardhan, Dipak K. Kole, Aruna Chakraborty",
//     title: "Digital Video Watermarking Using Motion Detection and Singular Value Decomposition",
//     date: "2011",
//     description: "",
//     type: "Conference",
//     location: "Book of Advances in Digital Image Processing and Information Technology, Communications in Computer and Information Science, Volume 205, Part 1"
//   },
//   {
//     author: "Dipak K. Kole, H. Rahaman, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "Derivation of Optimal Test Set for Detection Multiple Missing-Gate Faults in Reversible Circuits",
//     date: "December 01-04, 2010",
//     description: "",
//     type: "Conference",
//     location: "19th IEEE Asian Test Symposium 2010 (ATS 2010), IEEE Xplore Digital Library, at Shanghai University, Shanghai, China"
//   },
//   {
//     author: "Dipak K. Kole, H. Rahaman, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "Synthesis of Online Testable Reversible Circuit",
//     date: "277-280, 2010",
//     description: "",
//     type: "Conference",
//     location: "13th IEEE International Symposium on Design and Diagnostics of Electronic Circuits and Systems 2010"
//   },
//   {
//     author: "Amiya Halder, Dipak K. Kole, Subarna Bhattacharjee",
//     title: "On-Line Colour Image Compression Based on Pipelined Architecture",
//     date: "2009",
//     description: "",
//     type: "Conference",
//     location: "Proc. of 2nd International Conference on Computer and Electrical Engineering (ICCEE 2009)"
//   },
//   {
//     author: "Dipak K. Kole, H. Rahaman, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "A Constructive Algorithm for Synthesis of Reversible Logic Circuits",
//     date: "2009",
//     description: "",
//     type: "Conference",
//     location: "Proc. of 12th International Conference on Information Technology (ICIT,09)"
//   },
//   {
//     author: "H. Rahaman, Dipak K. Kole, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "Optimum Test Set for Bridging Fault Detection in Reversible Circuits",
//     date: "December 01-04, 2007",
//     description: "",
//     type: "Conference",
//     location: "16th IEEE Asian Test Symposium 2007 (ATS 2007), Bejing, China"
//   },
//   {
//     author: "H. Rahaman, Dipak K. Kole, Debesh K. Das, Bhargab B. Bhattacharya",
//     title: "Detection of Bridging Fault in Reversible Circuit",
//     date: "August 9-12, 2006",
//     description: "",
//     type: "Conference",
//     location: "International Conference on 10Th IEEE VLSI Design and test Symposium, VDAT2006"
//   },
//   {
//     author: "Dipak K. Kole, Subhadip Basu",
//     title: "An Automated Group Key Authentication System Using Secret Image Sharing Scheme",
//     date: "January 6-8, 2006",
//     description: "",
//     type: "Conference",
//     location: "International conference on Recent Trends in Information System (IRIS 2006)"
//   },

//   //Books
//   {
//     author: "Suchandra Dutta, Avishake Adhikary, Dhrubasish Sarkar,Dipak K. Kole, Premananda Jana",
//     title: "“Deep Learning for COVID-19”",
//     date: "20 July 2021",
//     type: "Book",
//     location: "Book Chapter of Artificial Intelligence for COVID-19 pp 551-565. ( DOI:10.1007/978-3-030-69744-0_30 )",
//     },

// ];


const sampleListings = [
  {
    date: "2020",
    description: "Certificate of Appreciation is awarded to DIPAK KUMAR KOLE for Innovative Implementable Idea (〖 I〗^3) in SAMHAR COVID19 Hackathon 2020 (Supercomputing using AI, ML, Healthcare Analytics based Research for combating COVID19) organized by Ministry of Electronics & Information Technology (MeitY) and Department of Science & Technology (DST), 2020"
  },
  {
    date: "Jul-Oct 2018",
    description: " 	Certificate of Appreciation is awarded to DIPAK KUMAR KOLE for his instrumental role as SPOC for the SWAYAM-NPTEL Local Chapter of Jalpaiguri Govt. Engg. College, Jalpaiguri, West Bengal rated A Grade based on performance in NPTEL Online Certification courses,Jul-Oct 2018 "
  }
];

module.exports = { data: sampleListings };

