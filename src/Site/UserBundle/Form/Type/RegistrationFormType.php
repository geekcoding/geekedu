<?php

namespace Site\UserBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;

class RegistrationFormType extends BaseType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder
            ->add('username', null, array(
                'label' => 'form.username', 
                'translation_domain' => 'FOSUserBundle',
                'attr' => array(
                    'placeholder' => '请输入用户名',
                    'addon' => "<i class='icon-user'></i>"
                )
            ))
            ->add('email', 'email', array(
                'label' => 'form.email',
                'translation_domain' => 'FOSUserBundle',
                'attr' => array(
                    'placeholder' => '请输入邮箱地址',
                    'addon' => "<i class='icon-envelope'></i>"
                )
            ))->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'options' => array('translation_domain' => 'FOSUserBundle'),
                'first_options' => array('label' => 'form.password',
                    'attr' => array('placeholder' => '请输入密码','addon' => "<i class='icon-lock'></i>")),
                'second_options' => array('label' => 'form.password_confirmation',
                    'attr' => array('placeholder' => '请重复密码','addon' => "<i class='icon-key'></i>")),
                'invalid_message' => 'fos_user.password.mismatch'
            ))
        ;
    }
    public function getName()
    {
        return 'site_user_registration';
    }
}