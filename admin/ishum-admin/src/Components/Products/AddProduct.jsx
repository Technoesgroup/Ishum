import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../CSS/AddProduct.css';

const AddProduct = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('');
  const sizeOptions = [38, 40, 42, 44]; 

  const tagOptions = ['Bestseller', 'Exclusive', 'Is store'];
  const categoryOptions = ['Day Wear', 'Occasional Wear', 'Party Wear'];
  const subcategoryOptions = [
    'Anarkali', 'Sharara Suits', 'Indo Western', 'Fashion wear',
    'Dress', 'Co-ord sets'
  ];


  useEffect(() => {
    fetch("http://localhost:4000/api/get-collections")
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => {
        console.error("Error fetching collections:", err);
        alert("Failed to load collections");
      });
  }, []);

  const onDropMainImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setMainImagePreview(URL.createObjectURL(file));
    setMainImageFile(file);
  }, []);

  const [mainImageFile, setMainImageFile] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);

  const onDropThumbnails = useCallback((acceptedFiles) => {
    setThumbnailPreviews(acceptedFiles.map(file => URL.createObjectURL(file)));
    setThumbnailFiles(acceptedFiles);
  }, []);

  const onDropColorImages = useCallback((index, acceptedFiles) => {
    const updated = [...colorVariants];
    updated[index].images = acceptedFiles;
    updated[index].previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setColorVariants(updated);
  }, [colorVariants]);

  const DropzoneField = ({ onDrop, text }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });
    return (
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    );
  };

  const addColorVariant = () => {
    setColorVariants([...colorVariants, { colorName: '', images: [], previews: [] }]);
  };

  const updateColorVariant = (index, field, value) => {
    const updated = [...colorVariants];
    updated[index][field] = value;
    setColorVariants(updated);
  };

  const toggleSize = (size) => {
    const sizeStr = String(size); // Convert size to string
    setSizes(prev => prev.includes(sizeStr)
      ? prev.filter(s => s !== sizeStr)
      : [...prev, sizeStr]); // Ensure string values are added or removed
  };
  

  const toggleTag = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = async () => {
    // Ensure all sizes are strings and valid
    const validSizes = ['38', '40', '42', '44'];  // Valid size values
    const sizesAsStrings = sizes
    .map(size => String(size).trim()) // Convert sizes to string
    .filter(size => validSizes.includes(size));  // Filter out invalid sizes
  

  
  
    const formData = new FormData();
    formData.append('collectionName', selectedCollection);
    formData.append('name', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('price', price);
    formData.append('discount', discount);
    sizesAsStrings.forEach(size => {
      formData.append('size', size);
    });
    formData.append('color', color);
    formData.append('isBestseller', tags.includes('Bestseller'));
    formData.append('isExclusive', tags.includes('Exclusive'));
    formData.append('isIshumStore', tags.includes('Is store'));
  
    if (mainImageFile) {
      formData.append('image', mainImageFile);
    }
  
    thumbnailFiles.forEach((file) => {
      formData.append('thumbnails', file);
    });
  
    colorVariants.forEach((variant) => {
      variant.images.forEach((file) => {
        formData.append('colorImages', file); // image files
        formData.append('colorNames', variant.colorName); // corresponding colorName
      });
    });
    
    
  
    try {
      const response = await fetch("http://localhost:4000/api/products/add", {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) throw new Error("Failed to save product");
  
      const result = await response.json();
      console.log('Server response:', result);
      alert('Product saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving product. Check console for details.');
    }
  };
  
  
  

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <div className="form-columns">

        <div className="form-column">
          <div className="form-group">
          <label>Collection:</label>
<select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
  <option value="">Select Collection</option>
  {collections.map(col => (
    <option key={col._id} value={col._id}>{col.title}</option>
  ))}
</select>

          </div>

          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categoryOptions.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory:</label>
            <select value={subcategory} onChange={e => setSubcategory(e.target.value)}>
              <option value="">Select Subcategory</option>
              {subcategoryOptions.map(sub => <option key={sub}>{sub}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Discount:</label>
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
          </div>

          <div className="form-group">
          <label>Sizes Available:</label>
          {sizeOptions.map(size => (
  <label key={size}>
    <input
      type="checkbox"
      checked={sizes.includes(String(size))} // ✅ Compare with string
      onChange={() => toggleSize(size)}
    />
    {size}
  </label>
))}

          </div>

          <div className="form-group">
            <label>Tags:</label>
            {tagOptions.map(tag => (
              <label key={tag}>
                <input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} />
                {tag}
              </label>
            ))}
          </div>

          <div className="form-group">
            <label>Product Color:</label>
            <input type="text" value={color} onChange={e => setColor(e.target.value)} placeholder="e.g. Pink, Blue" />
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label>Main Image:</label>
            <DropzoneField onDrop={onDropMainImage} text="Drag & drop main image or click" />
            {mainImagePreview && <img src={mainImagePreview} alt="Product preview" className="preview-image" />}
          </div>

          <div className="form-group">
            <label>Thumbnails (4):</label>
            <DropzoneField onDrop={onDropThumbnails} text="Drag & drop thumbnails or click" />
            <div className="preview-images">
              {thumbnailPreviews.map((img, index) => (
                <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="preview-image" />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color Variants:</label>
            {colorVariants.map((variant, index) => (
              <div key={index} className="color-variant">
                <input
                  type="text"
                  placeholder="Color Name"
                  value={variant.colorName}
                  onChange={e => updateColorVariant(index, 'colorName', e.target.value)}
                />
                <DropzoneField
                  onDrop={(files) => onDropColorImages(index, files)}
                  text="Drag & drop color variant images"
                />
                <div className="preview-images">
                  {variant.previews && variant.previews.map((img, idx) => (
                    <img key={idx} src={img} alt={`Color variant ${idx + 1}`} className="preview-image" />
                  ))}
                </div>
              </div>
            ))}
            <button type="button" onClick={addColorVariant}>Add More Colors</button>
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>Save Product</button>
    </div>
  );
};

export default AddProduct;

