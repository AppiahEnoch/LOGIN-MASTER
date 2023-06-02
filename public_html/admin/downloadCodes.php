<?php
require_once '../../vendor/autoload.php';

include "../../config/config.php";

// Fetch data from the database
$query = "SELECT mobile, email, user_level, code FROM regcode WHERE user_level=1";
$result = $conn->query($query);

$pdf = new \FPDF();
$pdf->AddPage();

// Add Logo
$pdf->Image('ae.png',10,6,20);

// Set font
$pdf->SetFont('Arial','B',16);

// Add Brand Name
$pdf->Cell(80,10,'',0,0);
$pdf->Cell(30,10,'AECleanCodes',0,1);

// Title
$pdf->Cell(0,10,'User Registration Codes',0,1,'C');

// Date
$pdf->SetFont('Arial','',12);
$date = date('jS F, Y, g:i:s a'); // Get the current date in the specified format
$pdf->Cell(0,10,'Date: ' . $date,0,1,'R');


// Set a smaller font for the table
$pdf->SetFont('Arial','',12);

// Column headers
$header = array('Mobile', 'Email', 'UL', 'Code');

// Column widths
$w = array(30, 90, 10, 60);

// Colors for table header
$pdf->SetFillColor(255, 0, 0);
$pdf->SetTextColor(255);
$pdf->SetDrawColor(128, 0, 0);

// Header
for($i=0;$i<count($header);$i++)
    $pdf->Cell($w[$i],7,$header[$i],1,0,'C', true);
$pdf->Ln();

// Reset text color and draw color for data
$pdf->SetFillColor(224, 235, 255);
$pdf->SetTextColor(0);
$pdf->SetDrawColor(128, 0, 0);

// Data
$fill = false;
while($row = $result->fetch_assoc()) {
    $pdf->Cell($w[0],6,$row['mobile'],'LR', 0, '', $fill);
    $pdf->Cell($w[1],6,$row['email'],'LR', 0, '', $fill);
    $pdf->Cell($w[2],6,$row['user_level'],'LR', 0, '', $fill);
    $pdf->Cell($w[3],6,$row['code'],'LR', 0, '', $fill);
    $pdf->Ln();
    $fill = !$fill;
}

// Closing line
$pdf->Cell(array_sum($w),0,'','T');

// Save the PDF
$pdf->Output('D','codes.pdf');
?>
