<?php

namespace Bg\BgBundle\Service;

class ExcelService {


	/**
	*	@return Array[feuille][ligne][colonne]
	*/
	public static function toArray( $filename ) {

		$ret = [];
		$tableur = \PHPExcel_IOFactory::load($filename);
		$i = 0;
		$j = 1;
		$k = 0;

		try { 
			while( $sheet = $tableur->getSheet($i) )  {	
				while( $value = $sheet->getCell(\PHPExcel_Cell::stringFromColumnIndex($k).($j))->getValue()) {
					while( $value = $sheet->getCell(\PHPExcel_Cell::stringFromColumnIndex($k).($j))->getValue()) {
							if(!isset($ret[$i])) $ret[$i] = [];
							if(!isset($ret[$i][$j])) $ret[$i][$j] = [];
							$ret[$i][$j][$k] = $value;

							syslog(LOG_ERR, $value );
							$k++;
					}
					$j++;
					$k = 0;
				}
				$i++;
				$j=1;
				$k=0;	

			}
		} catch(\Exception $e ) {

		}
		return $ret;
	}
}