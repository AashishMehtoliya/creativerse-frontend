import React, { useState, useEffect } from "react";
import './App.css'; // relative path
import './index.css';

// Sample Data for Ad Performance Analytics
const adPerformanceData = {
  impressions: 1000000,
  clicks: 50000,
  conversions: 5000,
};

const App = () => {
  const [selectedAd, setSelectedAd] = useState<string>("Banner");
  const [inputText, setInputText] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [adMetrics, setAdMetrics] = useState(adPerformanceData);

  // New state variables for ad customization
  const [brandName, setBrandName] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("portrait");
  const [primaryColor, setPrimaryColor] = useState<string>("#ffffff");
  const [accentColor, setAccentColor] = useState<string>("#000000");
  const [productDescription, setProductDescription] = useState<string>("");
  const [aestheticTone, setAestheticTone] = useState<string>("");
  const [contrastLevel, setContrastLevel] = useState<string>("medium");
  const [brandNameFontSize, setBrandNameFontSize] = useState<number>(16);
  const [taglineFontSize, setTaglineFontSize] = useState<number>(14);
  const [fontStyle, setFontStyle] = useState<string>("sans-serif");
  const [tagline, setTagline] = useState<string>("");
  const [offerText, setOfferText] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [showApiResponse, setShowApiResponse] = useState<boolean>(false);



  // Handles Text Input for Assets
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);
  };

  const handleDimensionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDimensions(event.target.value); // Update the state
    console.log("Selected dimensions:", event.target.value); // Debug log
  };



  // Handle Launching Ads
  const handleLaunchAds = (): void => {
    
    const dimensionsArr = dimensions.split("#");
  
    const reqBody = {
      BRAND_NAME: brandName,
      WIDTH: parseInt(dimensionsArr[0]),
      HEIGHT: parseInt(dimensionsArr[1]),
      ORIENTATION: orientation,
      PRIMARY_COLOR: primaryColor,
      ACCENT_COLOR: accentColor,
      PRODUCT_DESCRIPTION: productDescription,
      AESTHETIC_TONE: aestheticTone,
      CONTRAST_LEVEL: contrastLevel,
      BRAND_NAME_FONT_SIZE: brandNameFontSize,
      FONT_STYLE: fontStyle,
      TAGLINE: tagline,
      TAGLINE_FONT_SIZE: taglineFontSize,
      OFFER_TEXT: offerText,
      PRODUCT_TYPE: productType,
      NEGATIVE_PROMPT: negativePrompt,
    };
  
    callAPI(reqBody);
  };
  
  const generateInsights = async() => {

    try {
      const response = await fetch("http://0.0.0.0:5001/api/hackathon/creative/analysis", {
        method: "GET"
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // If needed, handle the API response here
      const data = await response.json();
      console.log("API Response:", data);
      setApiResponse(data);
      setShowApiResponse(true) // Assuming data contains the response
      return data
  
    } catch (error) {
      console.error("Error calling API:", error);
    }

  }
  const callAPI = async (reqBody: Record<string, any>) => {
    const payload = {
      variables: reqBody, // Directly assign reqBody here
    };
  
    try {
      const response = await fetch("http://0.0.0.0:5001/api/hackathon/creative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // If needed, handle the API response here
      const data = await response.json();
      console.log("API Response:", data);
      return data
  
    } catch (error) {
      console.error("Error calling API:", error);
    }
  
    // Ensure this is outside the try-catch block
    setImagePath("/src/assets/generated-images/my-image.jpeg");
  };
    

  // Handle Color Changes
  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value);
  };

  // Handle File Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload
      console.log(`File selected: ${file.name}`);
      // You can add your file upload logic here
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAdMetrics(prevMetrics => ({
        impressions: prevMetrics.impressions + Math.floor(Math.random() * 100),
        clicks: prevMetrics.clicks + Math.floor(Math.random() * 10),
        conversions: prevMetrics.conversions + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">CreativeOps Platform</h1>
        {/* <button className="launch-button" onClick={handleLaunchAds}>
          Launch Ads
        </button> */}
      </header>

      {/* Main Dashboard */}
      <main className="dashboard">
        {/* Left Panel */}
        <aside className="panel left-panel">
          <div className="upload-text">
            <h2>Enter Prompt Details</h2>
          </div>

          {/* Additional Ad Customization Options */}
          <div className="ad-customization">            
            <label>
              Brand Name:
              <input 
                type="text"
                id="brandField"
                placeholder="e.g., Amul, Nike, Starbucks" 
                className="custom-input"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                />
            </label>
            
            <label>
              Dimensions:
              <select 
                className="custom-input"
                id="dimensionField"
                value={dimensions}
                onChange={handleDimensionsChange}
                >
                <option value="NA">--Select--</option>
                <option value="320#400">320x400</option>
                <option value="480#800">480×800</option>
                <option value="640#1136">640×1136</option>
                <option value="720#1280">720×1280</option>
                <option value="1366#768">1366x768</option>
                <option value="1920#1080">1920x1080</option> 
              </select>
            </label>
            
            <label>
              Orientation:
              <select 
                className="custom-input"
                id="orientationField"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                >
                <option value="Portrait">Portrait</option>
                <option value="Landscape">Landscape</option>
              </select>
            </label>
            
            <label>
              Primary Color:
              <input 
                type="color"
                id="primaryColorField" 
                className="custom-input"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                />
            </label>
            
            <label>
              Accent Color:
              <input 
                type="color" 
                id="accentColorField" 
                className="custom-input"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                />
            </label>
            
            <label>
              Product Description:
              <textarea
                id="descriptionField" 
                placeholder="Detailed description of central visual" 
                className="custom-input"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
            </label>
            
            <label>
              Aesthetic Tone:
              <input 
                type="text" 
                id="aestheticField" 
                placeholder="e.g., delicious, professional, energetic" 
                className="custom-input"
                value={aestheticTone}
                onChange={(e) => setAestheticTone(e.target.value)}
                />
            </label>
            
            <label>
              Contrast Level:
              <select 
                id="contrastField" 
                className="custom-input"
                value={contrastLevel}
                onChange={(e) => setContrastLevel(e.target.value)}
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            
            <label>
              Brand Name Font Size:
              <input 
                id="brandFontField" 
                type="number" 
                placeholder="Font size" 
                className="custom-input"
                value={brandNameFontSize}
                onChange={(e) => setBrandNameFontSize(Number(e.target.value))}
                />
            </label>
            
            <label>
              Tagline Font Size:
              <input 
                type="number" 
                id="taglineFontField" 
                placeholder="Font size" 
                className="custom-input"
                value={taglineFontSize}
                onChange={(e) => setTaglineFontSize(Number(e.target.value))}
                />
            </label>
            
            <label>
              Font Style:
              <select 
                id="fontStyleField" 
                className="custom-input"
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
              </select>
            </label>
            
            <label>
              Tagline:
              <input 
                id="brandTagLineField" 
                type="text" 
                placeholder="Brand tagline" 
                className="custom-input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                />
            </label>
            
            <label>
              Offer Text:
              <input 
                id="offerTextField" 
                type="text" 
                placeholder="Promotional text" 
                className="custom-input"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                />
            </label>
            
            <label>
              Product Type:
              <input 
                id="productTypeField" 
                type="text" 
                placeholder="Type of product imagery" 
                className="custom-input"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                />
            </label>

            <label>
              Negative Prompt:
              <input 
                id="negativePromptField" 
                type="text" 
                placeholder="What should not be there in the image" 
                className="custom-input"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                />
            </label>
            <div className="btn-dev">
            <button className="generate-button" onClick={handleLaunchAds}>
              Generate
            </button>
            </div>
            

          </div>

          
        </aside>

        {/* Center Panel */}
        <section className="panel center-panel">
          <div className="ad-preview">
            <h2>Banner Ad</h2>
            <div
              className="ad-content"
              style={{ 
                backgroundColor, 
                color: textColor,
                fontFamily: fontStyle,
              }}
              >
              {imagePath ? (
                <div style={{ display : "flex", alignItems:"center", flexDirection:"column"}} >
                <img src={imagePath} alt="Generated Ad" style={{ width: "100%", height: "auto" }} />
                <button className="generate-insights" style={{ padding:"10px"}} onClick={generateInsights}>
                  Generate Insights
                </button>
                </div>
              ) : (
                <p>No image generated yet</p>
              )}
              {/* <h3 style={{ fontSize: `${brandNameFontSize}px` }}>{brandName}</h3>
              <p style={{ fontSize: `${taglineFontSize}px` }}>{tagline}</p>
              <p>{adFormats[selectedAd]}</p>
              <p>{inputText}</p>
              <p>{offerText}</p>
              <p>Dimensions: {dimensions}</p>
              <p>Orientation: {orientation}</p>
              <p>Product Type: {productType}</p>
              <p>Aesthetic Tone: {aestheticTone}</p>
              <p>Contrast Level: {contrastLevel}</p> */}
            </div>
          </div>
          {showApiResponse && (
          <div className="api-response-container">
          <h2>API Response</h2>
          <div className="response-items">
            {Object.entries(apiResponse).map(([key, value]) => (
              <div key={key} className="response-item">
                <span className="key">{key.replace('_', ' ').toUpperCase()}:</span>
                <span
                  className={`value ${value ? 'true' : 'false'}`}
                  style={{ color: value ? 'green' : 'red' }}
                >
                  {value ? '✔️ Yes' : '❌ No'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
        </section>

        {/* Right Panel - Ad Performance Metrics */}
        
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 CreativeOps Platform. All Rights Reserved.</p>
      </footer>
    </div>
              </>
  );
};

export default App;