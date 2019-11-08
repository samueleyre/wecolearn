<?php
namespace App\Dql;

use Doctrine\ORM\Query\AST\Functions\FunctionNode,
  Doctrine\ORM\Query\Lexer;

class Round extends FunctionNode
{
  private $arithmeticExpression;
  private $precision;

  public function __construct() {
      parent::__construct('Round');
  }

  public function parse(\Doctrine\ORM\Query\Parser $parser)
  {

    $lexer = $parser->getLexer();

    $parser->match(Lexer::T_IDENTIFIER);
    $parser->match(Lexer::T_OPEN_PARENTHESIS);

    $this->arithmeticExpression = $parser->SimpleArithmeticExpression();

    if (Lexer::T_COMMA === $lexer->lookahead['type']) {
      $parser->match(Lexer::T_COMMA);
      $this->precision = $parser->ArithmeticPrimary();
    }

    $parser->match(Lexer::T_CLOSE_PARENTHESIS);
  }

  public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
  {
    $precisionSql = '';
    if ($this->precision) {
      $precisionSql = ' ,'.$sqlWalker->walkSimpleArithmeticExpression($this->precision);
    }
    return 'ROUND(' . $sqlWalker->walkSimpleArithmeticExpression($this->arithmeticExpression) .$precisionSql. ')';
  }
}
