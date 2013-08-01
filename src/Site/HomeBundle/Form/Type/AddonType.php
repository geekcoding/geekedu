<?php

namespace Site\HomeBundle\Form\Type;

use Symfony\Component\Form\AbstractType as FormAbstractType;
use Symfony\Component\Form\FormBuilder;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;

/**
 * ImagePreviewType
 *
 */
class AddonType extends FormAbstractType
{

    /**
     * {@inheritDoc}
     */
    public function getDefaultOptions(array $options)
    {
        $options = parent::getDefaultOptions($options);
        $options['addon'] = '@';

        return $options;
    }

    /**
     * {@inheritDoc}
     */
    public function buildView(FormView $view, FormInterface $form)
    {
        $view->set('addon', $form->getAttribute('addon'));
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->setAttribute('addon', $options['addon'])
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'add_on';
    }

    public function getParent(array $options)
    {
        return 'field';
    }
}