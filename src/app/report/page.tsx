'use client'

import React, { useState } from 'react';

const ElectronicItems: React.FC = () => {
  const electronicItems: { [key: string]: { brands: { name: string; models: string[] }[] } } = {
    mobile: {
      brands: [
        { name: 'Samsung', models: ['Galaxy S21', 'Galaxy A52', 'Galaxy Note 20'] },
        { name: 'Apple', models: ['iPhone 13 Pro', 'iPhone 14', 'iPhone 15'] },
        { name: 'Xiaomi', models: ['Redmi Note 11', 'Redmi 12', 'Mi 11X'] },
        { name: 'OnePlus', models: ['OnePlus 9', 'OnePlus Nord 2', 'OnePlus 8T'] },
        { name: 'Google', models: ['Pixel 6', 'Pixel 5a', 'Pixel 4'] },
      ],
    },
    laptop: {
      brands: [
        { name: 'Dell', models: ['Inspiron 15', 'XPS 13', 'Latitude 5420'] },
        { name: 'HP', models: ['Pavilion x360', 'Spectre x360', 'Omen 15'] },
        { name: 'Lenovo', models: ['IdeaPad Slim 5', 'ThinkPad X1', 'Legion 5'] },
        { name: 'Apple', models: ['MacBook Air M1', 'MacBook Pro M2', 'MacBook Pro 16'] },
        { name: 'Asus', models: ['ROG Zephyrus G14', 'VivoBook 15', 'TUF Dash F15'] },
      ],
    },
    eWaste: {
      brands: [
        { name: 'Old Electronics', models: ['Old Smartphone', 'Old Laptop', 'Old Tablet'] },
        { name: 'Chargers', models: ['Phone Charger', 'Laptop Charger', 'USB Cable'] },
        { name: 'Batteries', models: ['Old Phone Battery', 'Old Laptop Battery', 'Camera Battery'] },
        { name: 'Old Monitors', models: ['CRT Monitor', 'Old LED Monitor'] },
        { name: 'Cables', models: ['HDMI Cable', 'VGA Cable', 'Power Cable'] },
        { name: 'Mice & Keyboards', models: ['Old Mouse', 'Old Keyboard', 'Wired Mouse'] },
        { name: 'Speakers', models: ['Old Bluetooth Speaker', 'Wired Speaker'] },
        { name: 'Old Wearables', models: ['Old Smartwatch', 'Fitness Tracker'] },
        { name: 'Old Appliances', models: ['Old Refrigerator', 'Old Washing Machine', 'Old Microwave'] },
        { name: 'Printers & Scanners', models: ['Old Printer', 'Scanner'] },
        { name: 'Cameras', models: ['Old DSLR', 'Old Point-and-Shoot'] },
      ],
    },
  };

  const prices: {
    [key: string]: {
      [brand: string]: {
        [model: string]: number;
      };
    };
  } = {
    mobile: {
      Samsung: { 'Galaxy S21': 40000, 'Galaxy A52': 18000, 'Galaxy Note 20': 35000 },
      Apple: { 'iPhone 13 Pro': 35000, 'iPhone 14': 45000, 'iPhone 15': 50000 },
      Xiaomi: { 'Redmi Note 11': 20000, 'Redmi 12': 6000, 'Mi 11X': 25000 },
      OnePlus: { 'OnePlus 9': 30000, 'OnePlus Nord 2': 20000, 'OnePlus 8T': 25000 },
      Google: { 'Pixel 6': 35000, 'Pixel 5a': 25000, 'Pixel 4': 15000 },
    },
    laptop: {
      Dell: { 'Inspiron 15': 55000, 'XPS 13': 95000, 'Latitude 5420': 65000 },
      HP: { 'Pavilion x360': 62000, 'Spectre x360': 40000, 'Omen 15': 56000 },
      Lenovo: { 'IdeaPad Slim 5': 58000, 'ThinkPad X1': 45000, 'Legion 5': 57000 },
      Apple: { 'MacBook Air M1': 99900, 'MacBook Pro M2': 139900, 'MacBook Pro 16': 229900 },
      Asus: { 'ROG Zephyrus G14': 115000, 'VivoBook 15': 47000, 'TUF Dash F15': 90000 },
    },
    eWaste: {
      'Old Electronics': { 'Old Smartphone': 5000, 'Old Laptop': 10000, 'Old Tablet': 8000 },
      'Chargers': { 'Phone Charger': 500, 'Laptop Charger': 1500, 'USB Cable': 200 },
      'Batteries': { 'Old Phone Battery': 1000, 'Old Laptop Battery': 1500, 'Camera Battery': 800 },
      'Old Monitors': { 'CRT Monitor': 3000, 'Old LED Monitor': 4000 },
      'Cables': { 'HDMI Cable': 500, 'VGA Cable': 300, 'Power Cable': 200 },
      'Mice & Keyboards': { 'Old Mouse': 300, 'Old Keyboard': 400, 'Wired Mouse': 350 },
      'Speakers': { 'Old Bluetooth Speaker': 1500, 'Wired Speaker': 1000 },
      'Old Wearables': { 'Old Smartwatch': 2000, 'Fitness Tracker': 1500 },
      'Old Appliances': { 'Old Refrigerator': 10000, 'Old Washing Machine': 8000, 'Old Microwave': 5000 },
      'Printers & Scanners': { 'Old Printer': 2000, 'Scanner': 1000 },
      'Cameras': { 'Old DSLR': 15000, 'Old Point-and-Shoot': 3000 },
    },
  };

  const [selectedItem, setSelectedItem] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [detectedPrice] = useState<number | null>(null);
  const [showPricePopup, setShowPricePopup] = useState(false);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
    setSelectedBrand('');
    setSelectedModel('');
    setImage(null);
    setDescription('');
    setProductName('');
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = prices[selectedItem]?.[selectedBrand]?.[selectedModel];
    if (price) {
      alert(`The Price Of The Selected Product Is ₹${price}`);
    } else {
      alert('Price Not Available For The Selected Product');
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>E-Waste Report</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Product Name :</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={handleProductNameChange}
          style={styles.input}
        />
  
        <label style={styles.label}>Product Type :</label>
        <select title="Select an electronic item" value={selectedItem} onChange={handleItemChange} style={styles.select}>
          <option value="">Select An Item</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
        </select>
  
        {selectedItem && (
          <>
            <label style={styles.label}>Brands :</label>
            <select title="Select a brand" value={selectedBrand} onChange={handleBrandChange} style={styles.select}>
              <option value="">Select A Brand</option>
              {electronicItems[selectedItem as keyof typeof electronicItems]?.brands.map((brand) => (
                <option key={brand.name} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </>
        )}
  
        {selectedBrand && (
          <>
            <label style={styles.label}>Models :</label>
            <select title="Select a model" value={selectedModel} onChange={handleModelChange} style={styles.select}>
              <option value="">Select A Model</option>
              {electronicItems[selectedItem]?.brands
                .find((brand) => brand.name === selectedBrand)
                ?.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </>
        )}
  
        <label style={styles.label}>Product Description :</label>
        <textarea
          placeholder="Enter product description"
          value={description}
          onChange={handleDescriptionChange}
          style={styles.textarea}
        />
  
        <input type="file" onChange={handleImageChange} title="Upload An Image" className="input-file" style={styles.fileInput} />

        {image && (
          <div style={styles.container}>
            <h3>Uploaded Image :</h3>
            <img src={URL.createObjectURL(image)} alt="Product" style={styles.image} />
          </div>
        )}
  
        <button type="submit" style={styles.button} className="button">Submit Report</button>
      </form>
  
      {detectedPrice && !showPricePopup && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detected Price : ₹{detectedPrice}</h3>
        </div>
      )}
  
      {showPricePopup && (
        <div style={popupStyles.modal}>
          <div style={popupStyles.modalContent}>
            <h2>The Price Of The Selected Product Is ₹{detectedPrice}</h2>
            <button
              style={popupStyles.closeButton}
              onClick={() => setShowPricePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  fileInput: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#f8f8f8',
    transition: 'background-color 0.3s ease',
  },


  select: {
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },

  textarea: {
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    height: '120px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },

  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },

  image: {
    width: '100%',
    maxWidth: '300px',
    marginTop: '10px',
  },

  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    marginTop: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  button: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ElectronicItems;