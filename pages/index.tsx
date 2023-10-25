import React, { useState } from "react";

const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'left',
    padding: '50px'
  },
  inputContainer: {
    marginBottom: '20px'
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#42B0F5',
    color: 'white',
    borderRadius: '5px',
    border: '1px solid #42B0F5'
  }
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFiles = [...files]; 
    newFiles[index] = event.target.files![0]; 
    setFiles(newFiles); 
  };

  const handleLegislatorsReport = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(file.name, file);
    });
    try {
      const response = await fetch('/api/reports/legislators', {
        method: 'POST',
        body: formData
      });
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'legislators-support-oppose-count.csv'; 
      link.click();
    } catch (error) {
      console.error(error);
    }    
  };  

  const handleBillsReport = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(file.name, file);
    });
    try {
      const response = await fetch('/api/reports/bills', {
        method: 'POST',
        body: formData
      });
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bills.csv'; 
      link.click();
    } catch (error) {
      console.error(error);
    }    
  };  

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer}>
        <div style={styles.inputContainer}>
          <label htmlFor="bills" style={styles.label}><strong>Bills: </strong></label>
          <input type="file" id="bills" accept=".csv" onChange={(e) => handleFileChange(e, 0)} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="legislators" style={styles.label}><strong>Legislators: </strong></label>
          <input type="file" id="legislators" accept=".csv" onChange={(e) => handleFileChange(e, 1)} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="votes" style={styles.label}><strong>Votes: </strong></label>
          <input type="file" id="votes" accept=".csv" onChange={(e) => handleFileChange(e, 2)} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="votes_results" style={styles.label}><strong>Votes Results: </strong></label>
          <input type="file" id="votes_results" accept=".csv" onChange={(e) => handleFileChange(e, 3)} />
        </div>
        <div style={{display: 'flex'}}>
          <button onClick={handleLegislatorsReport} style={{...styles.button, marginRight: '10px'}}>Generate Legislators Report</button>
          <button onClick={handleBillsReport} style={styles.button}>Generate Bills Report</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;