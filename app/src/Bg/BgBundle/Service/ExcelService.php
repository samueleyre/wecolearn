<?php

namespace Bg\BgBundle\Service;

class ExcelService {


	/**
	*	@return Array[feuille][ligne][colonne]
	*/
	public static function toArray( $filname ) {

		$ret = [];
		$tableur = \PHPExcel_IOFactory::load($file);
		$i = 0;
		$j = 0;
		$k = 1;

		while( $sheet = $tableur->getSheet($i)) {
			while( $value = $sheet->getCell(\PHPExcel_Cell::stringFromColumnIndex($k).($j))->getValue()) {
				while( $value = $sheet->getCell(\PHPExcel_Cell::stringFromColumnIndex($k).($j))->getValue()) {
						if(!isset($ret[$i])) $ret[$i] = [];
						if(!isset($ret[$i][$j])) $ret[$i][$j] = [];
						$ret[$i][$j][$k] = $value;
						$j++;
					}
				}
				$k++;
				$j = 0;

			}
			$i++;
			$j=0;
			$k=0;
		}
		return $ret;
	}
}